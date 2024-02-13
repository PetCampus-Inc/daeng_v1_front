import { handleKaKaoLogin } from "apis/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PATH } from "constants/path";

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
    onSuccess: () => navigate(PATH.OWNER_MA),
    onError: (err: Error) => console.log(err),
    throwOnError: true
  });

  return loginMutate.mutate;
};
