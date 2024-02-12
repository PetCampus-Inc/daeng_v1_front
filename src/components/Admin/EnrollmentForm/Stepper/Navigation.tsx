import SubmitButton from "./SubmitButton";
import * as S from "./styles";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Navigation = ({ currentStep, stepsLength, nextStep, prevStep }: NavigationProps) => {
  const isLastStep = currentStep === stepsLength - 1;

  const showPrevButton = (currentStep: number, stepsLength: number) => {
    return currentStep > 0 && currentStep < stepsLength - 1;
  };

  const showNextButton = (currentStep: number, stepsLength: number) => {
    return currentStep < stepsLength - 1;
  };

  return (
    <S.ButtonWrapper>
      {showPrevButton(currentStep, stepsLength) && (
        <S.PrevButton onClick={prevStep}>이전</S.PrevButton>
      )}
      {showNextButton(currentStep, stepsLength) && <S.Button onClick={nextStep}>다음</S.Button>}
      {isLastStep && <SubmitButton />}
    </S.ButtonWrapper>
  );
};

export default Navigation;
