import { PATH } from "constants/path";

import { handleAdminLoginResult } from "apis/admin.api";
import { handleLoginResult } from "apis/member.api";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { ILoginInfo } from "types/Member.type";

const useSignIn = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(adminLoginInfoAtom);
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const [isIdConfirmed, setIsIdConfirmed] = useState<boolean>(true);
  const [isPwConfirmed, setIsPwConfirmed] = useState<boolean>(true);
  const [infoForLogin, setInfoForLogin] = useState<ILoginInfo>({
    id: "",
    password: ""
  });
  const navigate = useNavigate();

  const handlerLogin = useCallback(async () => {
    try {
      const data = await handleLoginResult(infoForLogin);
      if (data.status === 200) {
        setCurrentMainStep(currentMainStep + 2);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handlerAdminLogin = async () => {
    try {
      const data = await handleAdminLoginResult({
        inputId,
        inputPw
      });
      if (data.status === 200) {
        setLoginInfo(() => ({
          adminId: data.data.adminId,
          adminName: data.data.adminName,
          schoolId: data.data.schoolId,
          role: data.data.role,
          schoolName: data.data.schoolName
        }));
        navigate(PATH.ADMIN_ATTENDANCE);
      }
    } catch (error: any) {
      // TODO: 에러처리 필요~!!~!
      if (error.status === 400) {
        setIsIdConfirmed(false);
        setIsPwConfirmed(false);
      }
    }
  };

  return {
    currentMainStep,
    setCurrentMainStep,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
    handlerLogin,
    handlerAdminLogin,
    isIdConfirmed,
    isPwConfirmed
  };
};

export default useSignIn;
