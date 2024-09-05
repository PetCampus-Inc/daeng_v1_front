import { getFieldStep } from "constants/step";

import { useAdminInfo } from "hooks/common/useAdminInfo";
import { Adapter } from "libs/adapters";
import { AdminFormToServerAdapter } from "libs/adapters/FormToServerAdapter";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { AdminEnrollmentInfoType } from "types/admin/enrollment.types";

interface SubmitButtonProps {
  type?: "READ" | "CREATE" | "EDIT";
  onNextStep?: (formInfo: AdminEnrollmentInfoType) => void;
  onOpenPopup: (field: string) => void;
}

const SubmitButton = ({ type, onNextStep, onOpenPopup }: SubmitButtonProps) => {
  const { handleSubmit } = useFormContext();

  const setStep = useSetRecoilState(currentStepState);
  const { adminId, schoolId } = useAdminInfo();

  const text = type === "EDIT" ? "수정 완료" : "가입 신청서 등록";

  const onSubmit = (data: FieldValues) => {
    const requestData = { ...data, adminId, schoolId };
    const saveData = Adapter.from(requestData).to<FieldValues, AdminEnrollmentInfoType>((item) =>
      new AdminFormToServerAdapter(item).adapt()
    );
    onNextStep?.(saveData);
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
