import { PATH } from "constants/path";

import { useLogInMutation } from "hooks/api/signin";
import { useSetLocalStorage, useLocalStorageClear } from "hooks/common/useLocalStorage";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ACCESS_TOKEN_KEY, AUTH_DOG_IDS, AUTH_MEMBER_ID } from "store/auth";
import { Nullable } from "types/helper.type";
import { isProviderValid } from "utils/auth";

const RedirectPage = () => {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");
  const user = searchParams.get("user");
  const memberId = searchParams.get("id");
  const dogIds = searchParams.getAll("dogIds");
  const isMember = searchParams.get("isMember");

  if (!provider || !isProviderValid(provider)) {
    throw new Error("유효하지 않은 로그인 제공자입니다.");
  }

  const { loginMutate } = useLogInMutation();
  const setLocalStorageValue = useSetLocalStorage();
  const clearLocalStorage = useLocalStorageClear();

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
      if (isMember && JSON.parse(isMember)) {
        // 회원 O -> '/'(home)로 이동

        if (!token) {
          throw new Error("로그인에 필요한 토큰이 없습니다.");
        }

        clearLocalStorage();
        setLocalStorageValue({ key: ACCESS_TOKEN_KEY, value: token });
        setLocalStorageValue({ key: AUTH_MEMBER_ID, value: memberId });
        setLocalStorageValue({ key: AUTH_DOG_IDS, value: dogIds });
        window.location.replace(PATH.ROOT);
      } else {
        // 회원 X -> '/signup'으로 이동
        clearLocalStorage();
        setLocalStorageValue({ key: ACCESS_TOKEN_KEY, value: token });
        window.location.replace(PATH.SIGNUP);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, token, returnedState, loginMutate, provider]);

  return <div>로그인 중...</div>;
};

export default RedirectPage;
