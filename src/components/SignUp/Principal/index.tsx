import useSignUp from "hooks/useSignUp";
import { Dispatch, SetStateAction } from "react";
import Step1 from "../Step/step1";
import Step2 from "../Step/step2";

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
    </>
  );
};

export default Principal;
