import { PATH } from "constants/path";

import { useMutation } from "@tanstack/react-query";
import { handleKaKaoLogin } from "apis/auth.api";
import { useNavigate } from "react-router-dom";

interface LoginMutateProps {
  provider: "kakao" | "google" | "apple";
  code: string;
}

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
