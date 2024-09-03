import { ACCESS_TOKEN_KEY } from "constants/storage";

import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "apis/admin/admin.api";
import { postMemberLogin } from "apis/member/member.api";
import { useLocalStorageClear, useLocalStorage } from "hooks/common/useLocalStorage";
import { useRoleBasedNavigate } from "hooks/common/useRoleBasedNavigate";
import usePostNativeMessage from "hooks/native/useNativeMessage";
import { useSetRecoilState } from "recoil";
import { adminInfoState } from "store/admin";
import { dogState } from "store/member";
import { AdminAuthType } from "types/admin/admin.types";
import { MemberAuthData } from "types/member/auth.types";
import { removeBearerPrefix } from "utils/token";

/**
 * 관리자(원장님/선생님)의 로그인을 처리합니다. 로그인 성공 시,
 * 로컬 스토리지에 AccessToken를 저장하고, Role 상태에 따라 페이지가 이동됩니다.
 */
export const useAdminLogin = () => {
  const redirect = useRoleBasedNavigate();
  const postMessage = usePostNativeMessage();

  const [_, setLocalStorage] = useLocalStorage<string | null>(ACCESS_TOKEN_KEY, null);
  const clearStorage = useLocalStorageClear();
  const setAdmin = useSetRecoilState(adminInfoState);

  const handleLoginSuccess = (response: { data: AdminAuthType; accessToken: string }) => {
    const accessToken = removeBearerPrefix(response.accessToken);

    clearStorage();
    setLocalStorage(accessToken);
    setAdmin(response.data);

    postMessage("LOGIN_SUCCESS", null);

    redirect();
  };

  const { mutate } = useMutation({
    mutationFn: postAdminLogin,
    onSuccess: handleLoginSuccess,
    throwOnError: false,
    retry: 0
  });

  return { mutateLogin: mutate };
};

/**
 * 멤버(견주)의 로그인을 처리합니다. 로그인 성공 시,
 * 로컬 스토리지에 AccessToken를 저장하고, Role 값에 따라 페이지가 이동됩니다.
 */
export const useMemberLogin = () => {
  const redirect = useRoleBasedNavigate();
  const postMessage = usePostNativeMessage();

  const [_, setLocalStorage] = useLocalStorage<string | null>(ACCESS_TOKEN_KEY, null);
  const clearStorage = useLocalStorageClear();
  const setDog = useSetRecoilState(dogState);

  const handleLoginSuccess = (response: { data: MemberAuthData; accessToken: string }) => {
    const accessToken = removeBearerPrefix(response.accessToken);

    clearStorage();
    setLocalStorage(accessToken);
    setDog(response.data);

    postMessage("LOGIN_SUCCESS", null);

    redirect();
  };

  const { mutate } = useMutation({
    mutationFn: postMemberLogin,
    onSuccess: handleLoginSuccess,
    throwOnError: false,
    retry: 0
  });

  return { mutateLogin: mutate };
};
