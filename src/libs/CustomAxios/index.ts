import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "store/auth";

const customAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: ("Bearer " + localStorage.getItem("token")) as string
  }
});

// customAxios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 404) {
//       window.location.href = "/NotFoundPage";
//     }
//     return Promise.reject(error);
//   }
// );

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

let isTokenRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

const addRefreshSubscriber = (cb: (token: string) => void) => subscribers.push(cb);
const onTokenRefreshed = (token: string) => {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
};

const getRefreshToken = async (): Promise<string> => {
  try {
    const res = await authAxios.post("token/refresh");
    const newAccessToken = res.headers["authorization"];

    if (!newAccessToken) throw new Error("Failed to refresh token");

    onTokenRefreshed(newAccessToken);
    subscribers = [];

    sessionStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
    return newAccessToken;
  } catch (e) {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    throw e instanceof Error ? e : new Error("Failed to refresh token");
  }
};

authAxios.interceptors.request.use((config) => {
  const exceptionPath = ["admin/login", "member/login", "token/refresh"];

  if (config.url && !exceptionPath.includes(config.url)) {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers[ACCESS_TOKEN_KEY] = `Bearer ${token}`;
    }
  }

  return config;
});

authAxios.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const originalRequest = axiosError.config as InternalAxiosRequestConfig;

      if (error.code === "EXPIRED_TOKEN" || error.code === "INVALID_TOKEN") {
        // 토큰 발행중일 경우
        if (isTokenRefreshing) {
          return new Promise((resolve) => {
            addRefreshSubscriber((token: string) => {
              originalRequest.headers.Authorization = token;
              resolve(authAxios(originalRequest));
            });
          });
        }

        isTokenRefreshing = true;

        // AccessToken 재발행
        try {
          const newAccessToken = await getRefreshToken();
          originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
          return authAxios(originalRequest);
        } catch (refreshError) {
          console.error("[Refresh Token]", refreshError);
          // TODO: 로그아웃 엔드포인트 요청 (Refresh Token 쿠키 삭제 후 로그인 페이지로 리다이렉트)
        } finally {
          isTokenRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;
