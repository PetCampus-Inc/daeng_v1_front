import Complete from "components/SignUp/Step/complete";
import Step1 from "components/SignUp/Step/step1";
import Step2 from "components/SignUp/Step/step2";
import useSignUp from "hooks/useSignUp";
import { Dispatch, SetStateAction, memo } from "react";

interface Props {
  currentMainStep: number;
  setCurrentMainStep: Dispatch<SetStateAction<number>>;
  className?: string;
}

const DogOwner = ({
  currentMainStep,
  setCurrentMainStep,
  className,
}: Props) => {
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
  } = useSignUp();
  const DOGOWNER = "dogOwner";
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
          className={DOGOWNER}
        />
      )}
      {currentStep === 2 && (
        <Step2
          currentMainStep={currentMainStep}
          setCurrentMainStep={setCurrentMainStep}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          userName={userName}
          setUserName={setUserName}
          userPhone={userPhone}
          setUserPhone={setUserPhone}
          className={DOGOWNER}
        />
      )}
      {currentStep === 3 && (
        <Complete
          setCurrentMainStep={setCurrentMainStep}
          className={DOGOWNER}
        />
      )}
    </>
  );
};

export default memo(DogOwner);
