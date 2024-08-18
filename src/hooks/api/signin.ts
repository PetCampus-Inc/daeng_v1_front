import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "apis/admin/admin.api";
import { useSetLocalStorage } from "hooks/common/useLocalStorage";
import { AUTH_KEY } from "store/auth";
import { Role } from "types/common/role.types";
import { isApproval } from "utils/is";

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

      if (isApproval(res.role)) {
        location.href = `${PATH.APPROVAL_STATUS}?type=admin&schoolName=${res.schoolName}&status=${res.role}`;
      }
    },
    throwOnError: false,
    retry: 0
  });

  return { mutateLogin: mutate };
};
