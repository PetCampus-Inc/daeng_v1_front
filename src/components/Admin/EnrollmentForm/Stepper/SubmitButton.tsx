import { PATH } from "constants/path";
import { FIELD_TO_STEP } from "constants/step";
import type { Dispatch, SetStateAction } from "react";

import { Adapter } from "libs/Adapter";
import { FormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentStepState, enrollmentFormAtom } from "store/form";

import * as S from "./styles";

import type { IRequestAdminEnrollment } from "types/School.type";
interface SubmitButtonProps {
  type?: "READ" | "CREATE" | "EDIT";
  setModal: Dispatch<SetStateAction<boolean>>;
}

const SubmitButton = ({ type, setModal }: SubmitButtonProps) => {
  const { handleSubmit } = useFormContext();
  const setEnrollmentForm = useSetRecoilState(enrollmentFormAtom);
  const setStep = useSetRecoilState(currentStepState);

  const navigate = useNavigate();

  const text = type === "EDIT" ? "수정 완료" : "가입 신청서 등록";

  const onSubmit = (data: FieldValues) => {
    const requestData = Adapter.from(data).to<FieldValues, IRequestAdminEnrollment>((item) =>
      new FormToServerAdapter(item).adapt()
    );

    setEnrollmentForm(requestData);
    navigate(PATH.ADMIN_SUBMIT_FORM);
  };

  const onInvalid = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors)[0];
    const step = FIELD_TO_STEP.get(firstErrorField);
    if (step !== undefined) {
      setStep(step);
      setModal(true);
    }
  };

  return (
    <S.Button type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
      {text}
    </S.Button>
  );
};

export default SubmitButton;
