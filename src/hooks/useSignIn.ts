import { useCallback, useState } from "react";
import { ILoginInfo } from "types/Member.type";
import { handleLoginResult } from "apis/member.api";
import { handleAdminLoginResult } from "apis/admin.api";
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const [isFail, setIsFail] = useState<boolean>(false);
  const [infoForLogin, setInfoForLogin] = useState<ILoginInfo>({
    id: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlerLogin = useCallback(async () => {
    try {
      const data = await handleLoginResult(infoForLogin);
      if (data.status === 200) {
        setCurrentMainStep(currentMainStep + 2);
      }
    } catch (error) {}
  }, []);

  const handlerAdminLogin = useCallback(async () => {
    try {
      const data = await handleAdminLoginResult({
        inputId,
        inputPw,
      });
      if (data.status === 200) {
        navigate("/");
      } else {
        setIsFail(true);
      }
    } catch (error) {
      setIsFail(true);
      console.log(error);
    }
  }, []);

  return {
    currentMainStep,
    setCurrentMainStep,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
    handlerLogin,
    handlerAdminLogin,
    isFail,
    setIsFail,
  };
};

export default useSignIn;
