import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "apis/admin/admin.api";
import { handleKaKaoLogin } from "apis/auth.api";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { Role } from "types/admin/admin.type";

interface LoginMutateProps {
  provider: "kakao" | "google" | "apple";
  code: string;
}

// 멤버 (소셜) 로그인 요청
export const useLogInMutation = () => {
  const navigate = useNavigate();
  const loginMutate = useMutation({
    mutationFn: (data: LoginMutateProps) => {
      const { provider, code } = data;
      switch (provider) {
        case "kakao":
          return handleKaKaoLogin(code);
        case "google":
          return handleKaKaoLogin(code); // FIXME: 구글 로그인 시 API 연동 필요
        case "apple":
          return handleKaKaoLogin(code); // FIXME: 애플 로그인 시 API 연동 필요
        default:
          throw new Error("Invalid provider");
      }
    },
    onSuccess: () => {
      // 회원가입이 되어 있으면, 홈으로 이동
      // 회원가입이 안되어 있으면,회원가입 페이지로 이동
    },
    onError: (err: Error) => console.log(err),
    throwOnError: true
  });

  return loginMutate.mutate;
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
