import { ACCESS_TOKEN_KEY } from "constants/storage";

import axios, { AxiosInstance, InternalAxiosRequestConfig, isAxiosError } from "axios";
import { setLocalStorage } from "hooks/common/useLocalStorage";
import { logout } from "hooks/common/useLogout";
import { postNativeMessage } from "hooks/native/useNativeMessage";
import { refreshToken, removeBearerPrefix } from "utils/token";

interface AuthAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const publicAxios: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_HOST,
  withCredentials: true
});

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

authAxios.interceptors.request.use(
  (config) => {
    const exceptionPath = [
      "admin/login",
      "member/super-login",
      "member/firebase/login",
      "auth/reissue"
    ];

    // 예외 URL이 아닌 경우, 헤더에 액세스 토큰 추가
    if (config.url && !exceptionPath.includes(config.url)) {
      const item = localStorage.getItem(ACCESS_TOKEN_KEY);

      const token = item ? JSON.parse(item) : null;
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => {
    const authHeader = response.headers["authorization"];

    if (authHeader) {
      const newToken = removeBearerPrefix(authHeader);

      const item = localStorage.getItem(ACCESS_TOKEN_KEY);
      const token = item ? JSON.parse(item) : null;

      if (token !== newToken) {
        postNativeMessage("REFRESH_TOKEN", null);
        setLocalStorage(ACCESS_TOKEN_KEY, newToken);
      }
    }

    return response;
  },
  async (error: unknown) => {
    if (isAxiosError(error)) {
      const originalRequest = error.config as AuthAxiosRequestConfig;

      const code = error.response?.data.code;
      if (code === "TOKEN-401-2") {
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          // 토큰 발행중일 경우 대기
          if (isTokenRefreshing) {
            return new Promise((resolve) => {
              addRefreshSubscriber((token: string) => {
                originalRequest.headers.Authorization = token;
                resolve(authAxios(originalRequest));
              });
            });
          }

          isTokenRefreshing = true;

          // 액세스 토큰 재발행 후 요청 재전송
          const newAccessToken = await refreshToken();
          onTokenRefreshed(newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          isTokenRefreshing = false;

          return authAxios(originalRequest);
        }
      } else if (code === "TOKEN-401-1" || code === "TOKEN-401-3" || code === "TOKEN-401-4") {
        // 액세스 토큰이 만료 되었거나, 찾을 수 없을 경우 로그아웃
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;
