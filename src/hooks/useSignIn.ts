import { useCallback, useState } from "react";
import { ILoginInfo } from "types/Member.type";
import { handleLoginResult } from "apis/member.api";

const useSignIn = () => {
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const [infoForLogin, setInfoForLogin] = useState<ILoginInfo>({
    id: "",
    password: "",
  });

  const handlerLogin = useCallback(async () => {
    try {
      const data = await handleLoginResult(infoForLogin);
      if (data.status === 200) {
        setCurrentMainStep(currentMainStep + 2);
      }
    } catch (error) {}
  }, []);

  return {
    currentMainStep,
    setCurrentMainStep,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
    handlerLogin,
  };
};

export default useSignIn;
