import { memo, Dispatch, SetStateAction } from "react";
import Step1 from "../Step/step1";
import Step2 from "../Step/step2";
import useSignUp from "hooks/useSignUp";
import Step3 from "../Step/step3";
import Step4 from "../Step/step4";

interface Props {
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
}

const Teacher = ({ currentMainStep, setCurrentMainStep }: Props) => {
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
  } = useSignUp();
  return (
    <>
      {currentStep === 1 && (
        <Step1
          searchText={searchText}
          setSearchText={setSearchText}
          searchResultText={searchResultText}
          setSearchResultText={setSearchResultText}
          selectedSearchText={selectedSearchText}
          setSelectedSearchText={setSelectedSearchText}
          handlerGetSearchResult={handlerGetSearchResult}
          currentMainStep={currentMainStep}
          setCurrentMainStep={setCurrentMainStep}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      )}

      {currentStep === 2 && (
        <Step2
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          userName={userName}
          setUserName={setUserName}
          userPhone={userPhone}
          setUserPhone={setUserPhone}
        />
      )}
      {currentStep === 3 && (
        <Step3
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          userId={userId}
          setUserId={setUserId}
          userPw={userPw}
          setUserPw={setUserPw}
        />
      )}
      {currentStep === 4 && <Step4 setCurrentMainStep={setCurrentMainStep} />}
    </>
  );
};

export default memo(Teacher);
