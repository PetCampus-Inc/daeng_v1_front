import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "apis/admin/admin.api";
import { useSetLocalStorage } from "hooks/common/useLocalStorage";
import { AUTH_KEY } from "store/auth";
import { Role } from "types/admin/admin.types";

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

      if (res.role === Role.ROLE_TEACHER || res.role === Role.ROLE_OWNER) {
        location.href = PATH.ADMIN_ATTENDANCE;
      }

      if (
        res.role === Role.APPROVAL_PENDING ||
        res.role === Role.APPROVAL_DENIED ||
        res.role === Role.APPROVAL_CANCEL
      ) {
        location.href = `${PATH.ADMIN_SIGNUP_APPROVAL_STATUS}?source=login`;
      }
    },
    throwOnError: false,
    retry: 0
  });

  return { mutateLogin: mutate };
};
