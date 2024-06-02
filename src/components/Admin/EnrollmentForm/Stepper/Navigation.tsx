import { FormButton, FormButtonWrapper, FormPrevButton } from "styles/StyleModule";

import SubmitButton from "./SubmitButton";

import type { AdminFormSaveType } from "types/admin/enrollment.types";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
  onNextStep?: (formInfo: AdminFormSaveType) => void;
}

const Navigation = ({
  currentStep,
  stepsLength,
  nextStep,
  prevStep,
  onNextStep
}: NavigationProps) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepsLength - 1;

  return (
    <FormButtonWrapper>
      {!isFirstStep && !isLastStep && <FormPrevButton onClick={prevStep}>이전</FormPrevButton>}
      {!isLastStep && <FormButton onClick={nextStep}>다음</FormButton>}
      {isLastStep && <SubmitButton onNextStep={onNextStep} />}
    </FormButtonWrapper>
  );
};

export default Navigation;
