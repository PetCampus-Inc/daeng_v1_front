import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "apis/admin/admin.api";
import { postMemberLogin } from "apis/member/member.api";
import { useLocalStorageClear, useSetLocalStorage } from "hooks/common/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, AUTH_KEY, AUTH_MEMBER_ID } from "store/auth";
import { AdminAuthType } from "types/admin/admin.types";
import { Role } from "types/common/role.types";
import { ApprovalStatus } from "types/common/status.types";
import { MemberAuthData } from "types/member/auth.types";
import { isAdmin, isApproval } from "utils/is";

const ROLE_MAP: { [key in ApprovalStatus]: string } = {
  APPROVED: "approved",
  APPROVAL_PENDING: "pending",
  APPROVAL_DENIED: "denied",
  APPROVAL_CANCEL: "cancel"
};

/**
 * 관리자(원장님/선생님)의 로그인을 처리합니다. 로그인 성공 시,
 * 로컬 스토리지에 AccessToken 및 MemberID를 저장하고, Role 상태에 따라 페이지가 이동됩니다.
 */
export const useAdminLogin = () => {
  const navigate = useNavigate();
  const setStorage = useSetLocalStorage();
  const clearStorage = useLocalStorageClear();

  const handleLoginSuccess = (response: AdminAuthType) => {
    const { adminId, role, schoolName } = response;

    clearStorage();
    setStorage({ key: AUTH_KEY, value: response });

    if (isAdmin(role)) navigate(PATH.ADMIN_ATTENDANCE, { replace: true });
    // else if (role === Role.WITHDRAWN) navigate(PATH.ADMIN_LOGIN, { replace: true });
    // else if (role === Role.APPROVAL_CANCEL)
    //   navigate(PATH.ADMIN_SIGNUP_SCHOOL_SEARCH, { replace: true, state: { adminId, schoolName } });
    else if (isApproval(role)) {
      const status = ROLE_MAP[role];
      navigate(PATH.APPROVAL_STATUS, {
        replace: true,
        state: {
          userId: adminId,
          type: "admin",
          schoolName: schoolName,
          status: status
        }
      });
    }
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
 * 로컬 스토리지에 AccessToken 및 MemberID를 저장하고, Role 상태에 따라 페이지가 이동됩니다.
 */
export const useMemberLogin = () => {
  const navigate = useNavigate();
  const setStorage = useSetLocalStorage();
  const clearStorage = useLocalStorageClear();

  const handleLoginSuccess = (response: { data: MemberAuthData; accessToken: string }) => {
    const { memberId, role, schoolName } = response.data;

    clearStorage();
    setStorage({ key: ACCESS_TOKEN_KEY, value: response.accessToken });
    setStorage({ key: AUTH_MEMBER_ID, value: memberId });

    if (role === Role.ROLE_ANONYMOUS) navigate(PATH.SIGNUP, { replace: true });
    else if (role === Role.ROLE_MEMBER) navigate(PATH.ROOT, { replace: true });
    // else if (role === Role.WITHDRAWN) navigate(PATH.LOGIN, { replace: true });
    // else if (role === Role.APPROVAL_CANCEL) navigate(PATH.MEMBER_SCHOOL_SEARCH, { replace: true });
    else if (isApproval(role)) {
      const status = ROLE_MAP[role];
      navigate(PATH.APPROVAL_STATUS, {
        replace: true,
        state: {
          userId: memberId,
          type: "member",
          schoolName: schoolName,
          status: status
        }
      });
    }
  };

  const { mutate } = useMutation({ mutationFn: postMemberLogin, onSuccess: handleLoginSuccess });
  return { mutateLogin: mutate };
};
