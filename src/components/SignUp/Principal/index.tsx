import useSignUp from "hooks/useSignUp";
import { Dispatch, SetStateAction } from "react";
import Step2 from "../Step/step2";
import Step3 from "../Step/step3";
import Step4 from "../Step/step4";
import Complete from "../Step/complete";

interface Props {
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
}

const Principal = ({ currentMainStep, setCurrentMainStep }: Props) => {
  const {
    currentStep,
    setCurrentStep,
    searchText,
    setSearchText,
    searchResultText,
    setSearchResultText,
    selectedSearchText,
    setSelectedSearchText,
    handlerGetSearchResult,
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
          className="principal"
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
          className="principal"
        />
      )}
      {currentStep === 3 && (
        <Step4
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
        />
      )}
      {currentStep === 4 && (
        <Complete
          setCurrentMainStep={setCurrentMainStep}
          className="principal"
        />
      )}
    </>
  );
};

export default Principal;
