import { FIELD_TO_STEP } from "constants/step";

import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useOverlay } from "hooks/common/useOverlay";
import { Adapter } from "libs/Adapter";
import { AdminFormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { AdminFormSaveType } from "types/admin/enrollment.types";

interface SubmitButtonProps {
  type?: "READ" | "CREATE" | "EDIT";
  onNextStep?: (formInfo: AdminFormSaveType) => void;
}

const SubmitButton = ({ type, onNextStep }: SubmitButtonProps) => {
  const { handleSubmit, setFocus } = useFormContext();
  const overlay = useOverlay();

  const setStep = useSetRecoilState(currentStepState);
  const { adminId, schoolId } = useAdminInfo();

  const text = type === "EDIT" ? "수정 완료" : "가입 신청서 등록";

  const openPopup = (field: string) =>
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

  const onSubmit = (data: FieldValues) => {
    const requestData = { ...data, adminId, schoolId };
    const saveData = Adapter.from(requestData).to<FieldValues, AdminFormSaveType>((item) =>
      new AdminFormToServerAdapter(item).adapt()
    );
    onNextStep?.(saveData);
  };

  const onInvalid = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors)[0];
    const step = FIELD_TO_STEP.get(firstErrorField);
    if (step !== undefined) {
      setStep(step);
      openPopup(firstErrorField);
    }
  };

  return (
    <FormButton type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
      {text}
    </FormButton>
  );
};

export default SubmitButton;
