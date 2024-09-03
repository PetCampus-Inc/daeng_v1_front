import { ACCESS_TOKEN_KEY } from "constants/storage";

import { isAxiosError } from "axios";
import { postNativeMessage } from "hooks/native/useNativeMessage";
import { jwtDecode, JwtPayload } from "jwt-decode";
import authAxios from "libs/AuthAxios";
import { User, Role } from "types/common/role.types";

interface Payload extends JwtPayload {
  role: Role;
  user: User;
}

/**
 * 토큰에서 특정 키의 값을 추출합니다.
 * @param token 토큰
 * @param key 추출할 키
 * @returns 추출된 값
 */
const decodeToken = <T extends keyof Payload>(token: string, key: T): Payload[T] | null => {
  const payload = jwtDecode<Payload>(token);
  return payload[key] ? payload[key] : null;
};

/** 토큰에서 Role을 추출합니다. */
export const extractRoleByToken = (token: string): Role | null => decodeToken(token, "role");

/** 토큰에서 User를 추출합니다. */
export const extractUserByToken = (token: string): User | null => decodeToken(token, "user");

/**
 * 토큰에서 Bearer 접두어를 제거합니다.
 * @param token 토큰
 * @returns 접두어가 제거된 토큰
 */
export const removeBearerPrefix = (token: string) => {
  return token.startsWith("Bearer ") ? token.replace(/^Bearer\s+/i, "") : token;
};

/**
 * 리프레시 토큰을 발급받아 로컬스토리지에 저장합니다.
 * @returns 새로운 액세스 토큰
 */
export const refreshToken = async (): Promise<string> => {
  try {
    const res = await authAxios.post("auth/reissue");
    const newAccessToken = res.headers["authorization"];

    if (!newAccessToken) throw new Error("액세스 토큰을 찾을 수 없습니다.");

    // 네이티브에게 토큰 갱신을 알림
    postNativeMessage("REFRESH_TOKEN", null);

    // 로컬스토리지에 새로운 액세스 토큰 저장
    localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

    return newAccessToken;
  } catch (error) {
    if (isAxiosError(error)) console.error(error.message);
    else console.error(error);
    throw error;
  }
};
