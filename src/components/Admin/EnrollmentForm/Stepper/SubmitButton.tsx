import { PATH } from "constants/path";
import { FIELD_TO_STEP } from "constants/step";

import AlertBottomSheet from "components/common/BottomSheet/AlertBottomSheet";
import useOverlay from "hooks/common/useOverlay/useOverlay";
import { Adapter } from "libs/Adapter";
import { AdminFormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentStepState, enrollmentFormAtom } from "store/form";

import * as S from "./styles";

import type { IRequestAdminEnrollment } from "types/admin/enrollment.types";

interface SubmitButtonProps {
  type?: "READ" | "CREATE" | "EDIT";
}

const SubmitButton = ({ type }: SubmitButtonProps) => {
  const { handleSubmit, setFocus } = useFormContext();
  const navigate = useNavigate();
  const overlay = useOverlay();

  const setEnrollmentForm = useSetRecoilState(enrollmentFormAtom);
  const setStep = useSetRecoilState(currentStepState);

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
    const requestData = Adapter.from(data).to<FieldValues, IRequestAdminEnrollment>((item) =>
      new AdminFormToServerAdapter(item).adapt()
    );

    setEnrollmentForm(requestData);
    navigate(PATH.ADMIN_SUBMIT_FORM);
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
    <S.Button type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
      {text}
    </S.Button>
  );
};

export default SubmitButton;
