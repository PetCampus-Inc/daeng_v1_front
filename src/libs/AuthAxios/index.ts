import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { ACCESS_TOKEN_KEY } from "store/auth";

interface AuthAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const authAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  withCredentials: true
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

    localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
    return newAccessToken;
  } catch (e) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    throw e instanceof Error ? e : new Error("Failed to refresh token");
  }
};

authAxios.interceptors.request.use(
  (config) => {
    const exceptionPath = ["admin/login", "member/firebase/login", "token/refresh"];

    if (config.url && !exceptionPath.includes(config.url)) {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      console.log(token);
      if (token) {
        config.headers[ACCESS_TOKEN_KEY] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const originalRequest = axiosError.config as AuthAxiosRequestConfig;

      if (
        originalRequest._retry &&
        (error.code === "EXPIRED_TOKEN" || error.code === "INVALID_TOKEN")
      ) {
        originalRequest._retry = true;
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

export default authAxios;
