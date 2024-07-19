import useNative from "hooks/native/useNative";
import { useEffect } from "react";

const NativeRedirectPage = () => {
  const { nativeEvent } = useNative();

  const handleTest = async () => {
    const uri = await nativeEvent.getDeviceId();
    console.log(uri);
  };

  useEffect(() => {
    const getToken = async () => {
      const idToken = await nativeEvent.getIdToken();
      const deviceId = await nativeEvent.getDeviceId();
      const body = { idToken, deviceId };

      console.log(body);
    };

    getToken();
  }, [nativeEvent]);

  return (
    <div>
      <button onClick={handleTest}>TEST</button>
    </div>
  );
};

export default NativeRedirectPage;
