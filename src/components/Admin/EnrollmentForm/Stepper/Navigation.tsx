import * as S from "./styles";
import SubmitButton from "./SubmitButton";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
}

const Navigation = ({ currentStep, stepsLength, nextStep, prevStep }: NavigationProps) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepsLength - 1;

  return (
    <>
      <S.ButtonWrapper>
        {!isFirstStep && !isLastStep && <S.PrevButton onClick={prevStep}>이전</S.PrevButton>}
        {!isLastStep && <S.Button onClick={nextStep}>다음</S.Button>}
        {isLastStep && <SubmitButton />}
      </S.ButtonWrapper>
    </>
  );
};

export default Navigation;
