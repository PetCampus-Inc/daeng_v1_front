import { ACCESS_TOKEN_KEY } from "constants/storage";

import axios, { AxiosInstance, InternalAxiosRequestConfig, isAxiosError } from "axios";
import { logout } from "hooks/common/useLogout";
import { refreshToken } from "utils/token";

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

authAxios.interceptors.request.use(
  (config) => {
    const exceptionPath = ["admin/login", "member/firebase/login", "auth/reissue"];

    // 로그인/리프레시 요청이 아닌 경우, 헤더에 액세스 토큰 추가
    if (config.url && !exceptionPath.includes(config.url)) {
      const item = localStorage.getItem(ACCESS_TOKEN_KEY);
      const token = item ? JSON.parse(item) : null;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (isAxiosError(error)) {
      const originalRequest = error.config as AuthAxiosRequestConfig;

      if (!originalRequest._retry) {
        if (error.code === "TOKEN-401-1" || error.code === "TOKEN-401-2") {
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

          try {
            // 액세스 토큰 재발행 후 요청 재전송
            const newAccessToken = await refreshToken();
            onTokenRefreshed(newAccessToken);

            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return authAxios(originalRequest);
          } catch (refreshError) {
            // 리프레시 토큰 검증 실패 시 로그아웃
            logout();
          } finally {
            isTokenRefreshing = false;
          }
        } else if (error.code === "TOKEN-401-3") {
          // 액세스 토큰을 찾을 수 없는 경우 로그아웃
          logout();
        }
      }
    }

    return Promise.reject(error);
  }
);

export default authAxios;
