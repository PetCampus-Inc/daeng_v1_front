import { useLogInMutation } from "hooks/api/signin";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { isProviderValid } from "utils/auth";

const RedirectPage = () => {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  if (!code || !provider || !isProviderValid(provider)) {
    throw new Error("로그인/회원가입에 실패했습니다.");
  }
  const loginMutate = useLogInMutation();

  useEffect(() => {
    loginMutate({ provider, code });
  }, [code, loginMutate, provider]);

  return <div>로그인 중...</div>;
};

export default RedirectPage;
