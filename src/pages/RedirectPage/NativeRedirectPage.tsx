import useNative from "hooks/native/useNative";
import authAxios from "libs/AuthAxios";
import { useEffect } from "react";

const NativeRedirectPage = () => {
  const { native } = useNative();

  const handleTest = async () => {
    const uri = await native.getDeviceId();
    console.log(uri);
  };

  useEffect(() => {
    const getToken = async () => {
      const idToken = await native.getIdToken();
      const deviceId = await native.getDeviceId();
      const body = { idToken, deviceId, method: "KAKAO" };

      console.log(body);
      const res = await authAxios.post("member/firebase/login", body);
      console.log(res);
    };

    getToken();
  }, [native]);

  return (
    <div>
      <button onClick={handleTest}>TEST</button>
    </div>
  );
};

export default NativeRedirectPage;
