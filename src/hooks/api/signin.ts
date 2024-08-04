import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "apis/admin/admin.api";
import { postMemberLogin } from "apis/member/member.api";
import { useSetLocalStorage } from "hooks/common/useLocalStorage";
import { ACCESS_TOKEN_KEY, AUTH_KEY } from "store/auth";
import { AdminRole, MemberRole } from "types/common/role.types";
import { ApprovalStatus } from "types/common/status.types";
import { MemberAuthData } from "types/member/auth.types";

// 관리자 로그인 요청
export const useAdminLogin = () => {
  const setAuth = useSetLocalStorage();

  const { mutate } = useMutation({
    mutationFn: postAdminLogin,
    onSuccess: (res) => {
      const userInfo = {
        adminId: res.adminId,
        adminName: res.adminName,
        schoolId: res.schoolId,
        role: res.role,
        schoolName: res.schoolName
      };
      setAuth({ key: AUTH_KEY, value: userInfo });

      if (res.role === AdminRole.ROLE_TEACHER || res.role === AdminRole.ROLE_OWNER) {
        location.href = PATH.ADMIN_ATTENDANCE;
      } else if (
        res.role === ApprovalStatus.APPROVAL_PENDING ||
        res.role === ApprovalStatus.APPROVAL_DENIED ||
        res.role === ApprovalStatus.APPROVAL_CANCEL
      ) {
        location.href = `${PATH.ADMIN_SIGNUP_APPROVAL_STATUS}?source=login`;
      }
    },
    throwOnError: false,
    retry: 0
  });

  return { mutateLogin: mutate };
};

// 멤버 로그인 요청
export const useMemberLogin = () => {
  const setLocalStorageValue = useSetLocalStorage();

  const dogStatusCheck = (dogs: any[]) => {
    for (const dog of dogs) {
      if (dog.status === "APPROVAL_PENDING") {
        location.href = `${PATH.SIGNUP}?source=login`;
        return;
      }
    }
  };

  const { mutate } = useMutation({
    mutationFn: postMemberLogin,
    onSuccess: ({ data, accessToken }) => {
      setLocalStorageValue({ key: ACCESS_TOKEN_KEY, value: accessToken });

      if (data.role === MemberRole.ROLE_MEMBER) {
        const userInfo: MemberAuthData = {
          memberId: data.memberId,
          role: data.role,
          dogs: data.dogs
        };

        setLocalStorageValue({ key: AUTH_KEY, value: userInfo });

        location.href = PATH.ROOT;
      } else if (data.role === MemberRole.ROLE_ANONYMOUS) {
        location.href = PATH.SIGNUP;
      }
    },
    throwOnError: false,
    retry: 0
  });

  return { mutateLogin: mutate };
};
