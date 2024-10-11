import { getFieldStep } from "constants/step";

import { useAdminInfo } from "hooks/common/useAdminInfo";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

interface SubmitButtonProps {
  type?: "READ" | "CREATE" | "EDIT";
  onNextStep?: (formInfo: FieldValues) => void;
  onOpenPopup: (field: string) => void;
}

const SubmitButton = ({ type, onNextStep, onOpenPopup }: SubmitButtonProps) => {
  const { handleSubmit } = useFormContext();

  const setStep = useSetRecoilState(currentStepState);
  const { schoolId } = useAdminInfo();

  const text = type === "EDIT" ? "수정 완료" : "가입 신청서 등록";

  const onSubmit = (data: FieldValues) => {
    const formValues = { ...data, schoolId };
    onNextStep?.(formValues);
  };

  const onInvalid = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors)[0];
    const step = getFieldStep({ field: firstErrorField, enable: true });
    if (step !== undefined) {
      setStep(step);
      onOpenPopup(firstErrorField);
    }
  };

  return (
    <FormButton type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
      {text}
    </FormButton>
  );
};

export default SubmitButton;
