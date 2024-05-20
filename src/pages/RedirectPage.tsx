import { PATH } from "constants/path";

import { useLogInMutation } from "hooks/api/signin";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Nullable } from "types/helper.type";
import { isProviderValid } from "utils/auth";

import type { AppleLoginInfo } from "apis/auth.api";

const RedirectPage = () => {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");
  const user = searchParams.get("user");

  if (!provider || !isProviderValid(provider)) {
    throw new Error("유효하지 않은 로그인 제공자입니다.");
  }

  const { loginMutate } = useLogInMutation();

  const handleAppleLogin = (code: Nullable<string>, user: Nullable<string>) => {
    if (!code) {
      throw new Error("로그인에 필요한 코드가 없습니다.");
    }

    const storedState = localStorage.getItem("apple_auth_state");
    if (returnedState !== storedState) {
      throw new Error("CSRF 공격이 의심됩니다. 로그인 요청의 상태 값이 일치하지 않습니다.");
    }

    let userObj;
    try {
      userObj = user ? JSON.parse(user) : null;
    } catch (error) {
      throw new Error("사용자 정보를 파싱하는 데 실패했습니다.");
    }

    loginMutate({
      req: { code, firstName: userObj?.name?.firstName, lastName: userObj?.name?.lastName }
    });
  };

  useEffect(() => {
    if (provider === "apple") {
      handleAppleLogin(code, user);
    } else if (provider === "kakao" || provider === "google") {
      if (!token) {
        throw new Error("로그인에 필요한 토큰이 없습니다.");
      }
      localStorage.clear();
      localStorage.setItem("token", token);
      window.location.replace(PATH.ADMIN_ATTENDANCE);
    }
  }, [code, token, returnedState, loginMutate, provider]);

  return <div>로그인 중...</div>;
};

export default RedirectPage;
