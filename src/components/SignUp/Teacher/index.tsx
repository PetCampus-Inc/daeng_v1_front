import { memo, Dispatch, SetStateAction } from "react";
import Step1 from "../Step/step1";
import Step2 from "../Step/step2";
import useSignUp from "hooks/useSignUp";

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
        <Step2 currentStep={currentStep} setCurrentStep={setCurrentStep} />
      )}
    </>
  );
};

export default memo(Teacher);
