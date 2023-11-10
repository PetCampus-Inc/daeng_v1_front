import { memo, Dispatch, SetStateAction } from "react";
import Step1 from "../Step/step1";
import Step2 from "../Step/step2";
import useSignUp from "hooks/useSignUp";
import Step3 from "../Step/step3";
import Complete from "../Step/complete";
import { TEACHER } from "constants/className";

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
    handlerDeleteSearchResult,
    handlerTeacherSignup,
    schoolId,
    setSchoolId,
    schoolName,
    userName,
    setUserName,
    userPhone,
    setUserPhone,
    userId,
    setUserId,
    userPw,
    setUserPw,
    handlerGetCheckId,
    setConfirmedId,
    confirmedId,
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
          schoolId={schoolId}
          setSchoolId={setSchoolId}
          handlerGetSearchResult={handlerGetSearchResult}
          handlerDeleteSearchResult={handlerDeleteSearchResult}
          currentMainStep={currentMainStep}
          setCurrentMainStep={setCurrentMainStep}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
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
          className={TEACHER}
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
          handlerGetCheckId={handlerGetCheckId}
          setConfirmedId={setConfirmedId}
          confirmedId={confirmedId}
          handlerTeacherSignup={handlerTeacherSignup}
          className={TEACHER}
        />
      )}
      {currentStep === 4 && (
        <Complete
          setCurrentMainStep={setCurrentMainStep}
          schoolName={schoolName}
          className={TEACHER}
        />
      )}
    </>
  );
};

export default memo(Teacher);
