import Complete from "components/SignUp/Step/complete";
import Step1 from "components/SignUp/Step/step1";
import Step2 from "components/SignUp/Step/step2";
import { DOGOWNER } from "constants/className";
import useSignUp from "hooks/api/useSignUp";
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
    handlerDeleteSearchResult,
    schoolId,
    setSchoolId,
    userName,
    setUserName,
    userPhone,
    setUserPhone,
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
          handlerDeleteSearchResult={handlerDeleteSearchResult}
          schoolId={schoolId}
          setSchoolId={setSchoolId}
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
          selectedSearchText={selectedSearchText}
          className={DOGOWNER}
        />
      )}
    </>
  );
};

export default memo(DogOwner);
