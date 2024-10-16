import { ACCESS_TOKEN_KEY, SCHOOL_NAME_KEY, USER_TYPE_KEY } from "constants/storage";

import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "apis/admin/admin.api";
import { postMemberLogin, postMemberSuperLogin } from "apis/member/member.api";
import { useBaseMutation } from "hooks/api/base";
import { useSetLocalStorage } from "hooks/common/useLocalStorage";
import { useRoleBasedPath } from "hooks/common/useRoleBasedPath";
import usePostNativeMessage from "hooks/native/useNativeMessage";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminInfoState } from "store/admin";
import { dogIdState } from "store/member";
import { AdminProfile } from "types/admin/admin.types";
import { User } from "types/common/role.types";
import { MemberAuthData } from "types/member/auth.types";
import { isApproval } from "utils/is";
import { extractRoleByToken, removeBearerPrefix } from "utils/token";

/**
 * 관리자(원장님/선생님)의 로그인을 처리합니다. 로그인 성공 시,
 * 로컬 스토리지에 AccessToken를 저장하고, Role 상태에 따라 페이지가 이동됩니다.
 */
export const useAdminLogin = () => {
  const navigate = useNavigate();
  const getRoleBasedPath = useRoleBasedPath();
  const postMessage = usePostNativeMessage();

  const setLocalStorage = useSetLocalStorage();
  const setAdmin = useSetRecoilState(adminInfoState);

  const handleLoginSuccess = (response: { data: AdminProfile; accessToken: string }) => {
    const accessToken = removeBearerPrefix(response.accessToken);
    const role = extractRoleByToken(accessToken);
    if (!role) throw new Error("로그인 실패");

    setAdmin(response.data);
    setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
    setLocalStorage(USER_TYPE_KEY, User.ADMIN);
    if (isApproval(role)) setLocalStorage(SCHOOL_NAME_KEY, response.data.schoolName);

    postMessage("REFRESH_TOKEN", null);

    const basedPath = getRoleBasedPath(role);
    navigate(basedPath, { replace: true });
  };

  const { mutate } = useBaseMutation({
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
  const navigate = useNavigate();
  const getRoleBasedPath = useRoleBasedPath();
  const postMessage = usePostNativeMessage();

  const setLocalStorage = useSetLocalStorage();
  const setDogId = useSetRecoilState(dogIdState);

  const handleLoginSuccess = (response: { data: MemberAuthData; accessToken: string }) => {
    const accessToken = removeBearerPrefix(response.accessToken);
    const role = extractRoleByToken(accessToken);
    if (!role) throw new Error("로그인 실패");

    setDogId(response.data.dogId);
    setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
    setLocalStorage(USER_TYPE_KEY, User.MEMBER);
    if (isApproval(role)) setLocalStorage(SCHOOL_NAME_KEY, response.data.schoolName);

    postMessage("REFRESH_TOKEN", null);

    const basedPath = getRoleBasedPath(role);
    navigate(basedPath, { replace: true });
  };

  const { mutate } = useBaseMutation({
    mutationFn: postMemberLogin,
    onSuccess: handleLoginSuccess,
    throwOnError: false,
    retry: 0
  });

  return { mutateLogin: mutate };
};

/** 웹 환경 개발용 멤버 로그인 */
export const useMemberSuperLogin = () => {
  const navigate = useNavigate();
  const getRoleBasedPath = useRoleBasedPath();

  const setLocalStorage = useSetLocalStorage();
  const setDogId = useSetRecoilState(dogIdState);

  const handleLoginSuccess = (response: { data: MemberAuthData; accessToken: string }) => {
    const accessToken = removeBearerPrefix(response.accessToken);
    const role = extractRoleByToken(accessToken);
    if (!role) throw new Error("로그인 실패");

    setDogId(response.data.dogId);
    setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
    setLocalStorage(USER_TYPE_KEY, User.MEMBER);
    if (isApproval(role)) setLocalStorage(SCHOOL_NAME_KEY, response.data.schoolName);

    const basedPath = getRoleBasedPath(role);
    navigate(basedPath, { replace: true });
  };

  const { mutate } = useMutation({
    mutationFn: postMemberSuperLogin,
    onSuccess: handleLoginSuccess,
    throwOnError: false,
    retry: 0
  });

  return { mutateLogin: mutate };
};
