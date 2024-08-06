import { PATH } from "constants/path";

import { useMemberLogin } from "hooks/api/signin";
import { useSetLocalStorage } from "hooks/common/useLocalStorage";
import nativeReceiver from "libs/nativeReceiver";
import { useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_DOG_IDS } from "store/auth";
import { MemberRole } from "types/common/role.types";
import { DogResponse, MemberAuthData } from "types/member/auth.types";
import { NativeMessage } from "types/native/message.types";

const NativeRedirectPage = () => {
  const navigate = useNavigate();
  const { mutateLogin } = useMemberLogin();
  const setLocalStorageValue = useSetLocalStorage();

  const getRedirectPathByDogs = (dogs: DogResponse[]): string => {
    if (dogs.length > 1) return PATH.ROOT;

    const [dog] = dogs;
    const isEnrolledOrDropOut = dog.status === "ENROLLED" || dog.status === "DROP_OUT";

    // TODO: PATH.DOG_APPROVAL_STATUS 페이지 필요
    return isEnrolledOrDropOut ? PATH.ROOT : PATH.ROOT;
  };

  const handleLoginSuccess = useCallback(
    (data: MemberAuthData) => {
      if (data.role === MemberRole.ROLE_MEMBER) {
        const dogIds = data.dogs.map((dog) => dog.dogId);
        setLocalStorageValue({ key: AUTH_DOG_IDS, value: dogIds });

        const redirectPath = getRedirectPathByDogs(data.dogs);
        navigate(redirectPath, { replace: true });
      } else if (data.role === MemberRole.ROLE_ANONYMOUS) {
        navigate(PATH.SIGNUP, { replace: true });
      }
    },
    [navigate, setLocalStorageValue]
  );

  const handleLogin = useCallback(
    ({ type, data }: NativeMessage) => {
      if (type === "FIREBASE_AUTH") {
        mutateLogin(data, {
          onSuccess: ({ data }) => handleLoginSuccess(data)
        });
      }
    },
    [mutateLogin, handleLoginSuccess]
  );

  useLayoutEffect(() => {
    nativeReceiver.registerCallback("FIREBASE_AUTH", handleLogin);
    return () => nativeReceiver.unregisterCallback("FIREBASE_AUTH");
  }, [handleLogin]);

  return null;
};

export default NativeRedirectPage;
