import { useCallback, useState } from "react";
import { ILoginInfo } from "types/Member.type";
import { handleLoginResult } from "apis/member.api";
import { handleAdminLoginResult } from "apis/admin.api";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminLoginInfoAtom } from "store/admin";
import { useRecoilState } from "recoil";
import { adminLoginInfoAtom } from "store/admin";

const useSignIn = () => {
  const [loginInfo, setLoginInfo] = useRecoilState(adminLoginInfoAtom);
  const [loginInfo, setLoginInfo] = useRecoilState(adminLoginInfoAtom);
  const [currentMainStep, setCurrentMainStep] = useState<number>(0);
  const [inputId, setInputId] = useState<string>("");
  const [inputPw, setInputPw] = useState<string>("");
  const [isIdConfirmed, setIsIdConfirmed] = useState<boolean>(true);
  const [isPwConfirmed, setIsPwConfirmed] = useState<boolean>(true);
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

  const handlerAdminLogin = async () => {
    try {
      const data = await handleAdminLoginResult({
        inputId,
        inputPw,
      });
      if (data.status === 200) {
        setLoginInfo((prevLoginInfo) => ({
          ...prevLoginInfo,
          data: {
            adminId: data.data.adminId,
            adminName: data.data.adminName,
            schoolId: data.data.schoolId,
            role: data.data.role,
            schoolName: data.data.schoolName,
          },
        }));
        navigate("/admin/attendance");
      }
    } catch (error: any) {
      console.log(error);
      error.response.data.message === "해당 ID를 찾을 수 없습니다"
        ? setIsIdConfirmed(false)
        : setIsIdConfirmed(true);
      error.response.data.message === "비밀번호가 일치하지 않습니다"
        ? setIsPwConfirmed(false)
        : setIsPwConfirmed(true);
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
    isPwConfirmed,
  };
};

export default useSignIn;
