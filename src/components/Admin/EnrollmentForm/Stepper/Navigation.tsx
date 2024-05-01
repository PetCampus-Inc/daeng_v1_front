import { FormButton, FormButtonWrapper, FormPrevButton } from "styles/StyleModule";

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
    <FormButtonWrapper>
      {!isFirstStep && !isLastStep && <FormPrevButton onClick={prevStep}>이전</FormPrevButton>}
      {!isLastStep && <FormButton onClick={nextStep}>다음</FormButton>}
      {isLastStep && <SubmitButton />}
    </FormButtonWrapper>
  );
};

export default Navigation;
