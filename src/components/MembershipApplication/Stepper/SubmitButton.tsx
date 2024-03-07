import { FIELD_TO_STEP } from "constants/step";
import type { Dispatch, SetStateAction } from "react";

import { useEnrollMutation } from "hooks/api/useEnrollMutation";
import { useFormContext, type FieldErrors } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { EnrollmentFormTransformer } from "utils/formTransformer";

import * as S from "./styles";

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const SubmitButton = ({ setModal }: Props) => {
  const { handleSubmit } = useFormContext();
  const setStep = useSetRecoilState(currentStepState);
  const enrollMutation = useEnrollMutation();

  const onSubmit = (data: object) => {
    // FIXME: schoolFormId, memberId, fileUrl 추가 필요
    const transformer = new EnrollmentFormTransformer(data);
    const requestData = transformer.transform();

    enrollMutation(requestData);
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
      제출하기
    </S.Button>
  );
};

export default SubmitButton;
