import { useMemberLogin } from "hooks/api/signin";
import useNative from "hooks/native/useNative";
import { useEffect } from "react";

const NativeRedirectPage = () => {
  const { native } = useNative();
  const { mutateLogin } = useMemberLogin();

  useEffect(() => {
    const getToken = async () => {
      try {
        const deviceId = await native.getDeviceId();
        const idToken = await native.getIdToken();
        const data = { idToken, deviceId };

        mutateLogin(data);
      } catch (error) {
        console.error("Error in getToken:", error);
      }
    };

    getToken();
  }, [native, mutateLogin]);

  return <div>로그인중...</div>;
};

export default NativeRedirectPage;
