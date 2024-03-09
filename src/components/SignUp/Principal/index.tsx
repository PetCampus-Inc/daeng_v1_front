import { PRINCIPAL } from "constants/className";

import useSignUp from "hooks/api/useSignUp";
import { Dispatch, SetStateAction } from "react";

import Complete from "../Step/complete";
import Step2 from "../Step/step2";
import Step3 from "../Step/step3";
import Step4 from "../Step/step4";

interface Props {
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
}

const Principal = ({ currentMainStep, setCurrentMainStep }: Props) => {
  const {
    currentStep,
    setCurrentStep,
    userName,
    setUserName,
    userPhone,
    setUserPhone,
    userId,
    setUserId,
    userPw,
    setUserPw,
    schoolName,
    setSchoolName,
    schoolPhone,
    setSchoolPhone,
    schoolNum,
    setSchoolNum,
    schoolAddress,
    setSchoolAddress,
    handlerGetCheckId,
    setConfirmedId,
    confirmedId,
    handlerCheckSchoolNum,
    confirmedSchoolNum,
    setConfirmedSchoolNum,
    // handlerOwnerSignup,
    handlerTeacherSignup
  } = useSignUp();
  return (
    <>
      {currentStep === 1 && (
        <Step2
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          userName={userName}
          setUserName={setUserName}
          userPhone={userPhone}
          setUserPhone={setUserPhone}
          currentMainStep={currentMainStep}
          setCurrentMainStep={setCurrentMainStep}
          className={PRINCIPAL}
        />
      )}
      {currentStep === 2 && (
        <Step3
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          userId={userId}
          setUserId={setUserId}
          userPw={userPw}
          setUserPw={setUserPw}
          className={PRINCIPAL}
          handlerGetCheckId={handlerGetCheckId}
          setConfirmedId={setConfirmedId}
          confirmedId={confirmedId}
          handlerTeacherSignup={handlerTeacherSignup}
        />
      )}
      {currentStep === 3 && (
        <Step4
          userName={userName}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          schoolName={schoolName}
          setSchoolName={setSchoolName}
          schoolPhone={schoolPhone}
          setSchoolPhone={setSchoolPhone}
          schoolNum={schoolNum}
          setSchoolNum={setSchoolNum}
          schoolAddress={schoolAddress}
          setSchoolAddress={setSchoolAddress}
          handlerCheckSchoolNum={handlerCheckSchoolNum}
          confirmedSchoolNum={confirmedSchoolNum}
          setConfirmedSchoolNum={setConfirmedSchoolNum}
          // handlerOwnerSignup={handlerOwnerSignup}
        />
      )}
      {currentStep === 4 && (
        <Complete
          setCurrentMainStep={setCurrentMainStep}
          schoolName={schoolName}
          className={PRINCIPAL}
        />
      )}
    </>
  );
};

export default Principal;
