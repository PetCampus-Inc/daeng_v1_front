import { useLogInMutation } from "hooks/api/signin";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { isProviderValid } from "utils/auth";

// MEMO: kakao, google은 서버에서 인가코드 발급, apple은 클라이언트에서 인가코드 발급
const RedirectPage = () => {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  const token = searchParams.get("token");

  if (!provider || !isProviderValid(provider)) {
    throw new Error("유효하지 않은 로그인 제공자입니다.");
  }

  const loginMutate = useLogInMutation();

  useEffect(() => {
    if (provider === "apple") {
      if (!code) {
        throw new Error("애플 로그인에 필요한 인가 코드가 없습니다.");
      }
      loginMutate({ provider, code });
    } else {
      if (!token) {
        throw new Error("로그인에 필요한 토큰이 없습니다.");
      }
    }
  }, [code, token, loginMutate, provider]);

  // TODO: 로그인 성공 후 홈으로 네비게이션 and 브라우저 히스토리 replace 해야함
  useEffect(() => {
    if (token) {
      localStorage.clear();
      localStorage.setItem("token", token);
      window.location.replace("/");
    }
  }, [token]);

  return <div>로그인 중...</div>;
};

export default RedirectPage;
