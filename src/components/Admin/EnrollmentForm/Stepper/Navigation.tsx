import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { useOverlay } from "hooks/common/useOverlay/useOverlay";
import { FieldValues, useFormContext } from "react-hook-form";
import { FormButton, FormButtonWrapper, FormPrevButton } from "styles/StyleModule";

import SubmitButton from "./SubmitButton";

interface NavigationProps {
  currentStep: number;
  stepsLength: number;
  nextStep: () => void;
  prevStep: () => void;
  onNextStep?: (formInfo: FieldValues) => void;
}

const Navigation = ({
  currentStep,
  stepsLength,
  nextStep,
  prevStep,
  onNextStep
}: NavigationProps) => {
  const { setFocus } = useFormContext();
  const overlay = useOverlay();

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === stepsLength - 1;

  const openAlertPopup = (field: string) =>
    overlay.open(({ isOpen, close }) => (
      <AlertBottomSheet
        isOpen={isOpen}
        close={() => {
          close();
          setFocus(field);
        }}
        title="입력을 하지 않은 필수 항목이 있어요"
        subtitle="유의사항에 동의하지 않으면 가입이 어려워요"
        actionText="확인"
        actionFn={() => {
          close();
          setFocus(field);
        }}
      />
    ));

  return (
    <FormButtonWrapper>
      {!isFirstStep && !isLastStep && <FormPrevButton onClick={prevStep}>이전</FormPrevButton>}
      {!isLastStep && <FormButton onClick={nextStep}>다음</FormButton>}
      {isLastStep && <SubmitButton onNextStep={onNextStep} onOpenPopup={openAlertPopup} />}
    </FormButtonWrapper>
  );
};

export default Navigation;
