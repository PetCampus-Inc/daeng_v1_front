import { PATH } from "constants/path";

import { postNativeMessage } from "hooks/native/useNativeMessage";
import { publicAxios } from "libs/AuthAxios";
import { useCallback } from "react";

/** 로컬스토리지 및 쿠키 초기화 후, 로그인 페이지로 이동합니다. */
export const logout = async () => {
  const url = `${process.env.REACT_APP_SERVER_HOST}auth/logout`;
  try {
    await publicAxios.post(url);
  } catch (error) {
    console.warn("로그아웃 API 요청 실패!");
  }

  postNativeMessage("LOGOUT", null);

  // TODO: 로그인 인증 관련 스토리지 값만 삭제하도록 변경
  localStorage.clear();
  location.href = PATH.LOGIN;
};

export default function useLogout() {
  return useCallback(logout, []);
}
