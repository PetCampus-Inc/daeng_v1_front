import { PATH } from "constants/path";

import { useSetLocalStorage, useLocalStorageClear } from "hooks/common/useLocalStorage";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ACCESS_TOKEN_KEY, AUTH_DOG_IDS, AUTH_MEMBER_ID } from "store/auth";
import { isProviderValid } from "utils/auth";

const RedirectPage = () => {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const setLocalStorageValue = useSetLocalStorage();
  const clearLocalStorage = useLocalStorageClear();

  const token = searchParams.get("token");
  const memberId = searchParams.get("id");
  const dogIds = searchParams.getAll("dogIds");
  const isMember = searchParams.get("isMember");

  if (!provider || !isProviderValid(provider)) {
    throw new Error("유효하지 않은 로그인 제공자입니다.");
  }

  useEffect(() => {
    if (isMember && JSON.parse(isMember)) {
      // 회원 O -> '/'(home)로 이동
      // if (!token) {
      //   throw new Error("로그인에 필요한 토큰이 없습니다.");
      // }
      clearLocalStorage();
      setLocalStorageValue({ key: ACCESS_TOKEN_KEY, value: token });
      setLocalStorageValue({ key: AUTH_MEMBER_ID, value: memberId });
      setLocalStorageValue({ key: AUTH_DOG_IDS, value: dogIds });
      // window.location.replace(PATH.ROOT);
    } else {
      // 회원 X -> '/signup'으로 이동
      clearLocalStorage();
      setLocalStorageValue({ key: ACCESS_TOKEN_KEY, value: token });
      setLocalStorageValue({ key: AUTH_MEMBER_ID, value: memberId });
      // window.location.replace(PATH.SIGNUP);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, provider]);

  return <div>로그인 중...</div>;
};

export default RedirectPage;
