import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "apis/admin/admin.api";
import { postAppleLogin } from "apis/auth.api";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { Role } from "types/admin/admin.type";

// 멤버 (소셜) 로그인 요청
export const useLogInMutation = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: postAppleLogin,
    onSuccess: (res) => {
      if (res.authToken) {
        localStorage.setItem("token", res.authToken);
        navigate(PATH.HOME); // 홈 페이지로 이동
      } else {
        navigate(PATH.LOGIN); // 로그인 페이지로 이동
      }
    },
    onError: (err: Error) => {
      console.error(err);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
    throwOnError: true
  });

  return { loginMutate: mutate };
};

// 관리자 로그인 요청
export const useAdminLogin = () => {
  const navigate = useNavigate();
  const setLoginInfo = useSetRecoilState(adminLoginInfoAtom);
  const { mutate } = useMutation({
    mutationFn: postAdminLogin,
    onSuccess: (res) => {
      setLoginInfo(() => ({
        adminId: res.adminId,
        adminName: res.adminName,
        schoolId: res.schoolId,
        role: res.role,
        schoolName: res.schoolName
      }));
      if (res.role === Role.ROLE_TEACHER || res.role === Role.ROLE_OWNER)
        navigate(PATH.ADMIN_ATTENDANCE);
      // TODO: deny, cancel 상태일 때도 리다이렉트 처리 필요!
      if (res.role === Role.APPROVAL_PENDING)
        navigate(`${PATH.ADMIN_SIGNUP_APPROVAL_STATUS}&source=login`);
    },
    throwOnError: false
  });

  return { mutateLogin: mutate };
};
