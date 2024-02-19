import { useFormContext, type FieldErrors } from "react-hook-form";
import { useEnrollMutation } from "hooks/api/useEnrollMutation";
import { useSetRecoilState } from "recoil";

import type { Dispatch, SetStateAction } from "react";
import * as S from "./styles";
import { currentStepState } from "store/form";
import { EnrollmentFormTransformer } from "utils/formTransformer";
import { FIELD_TO_STEP } from "constants/step";

interface Props {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const SubmitButton = ({ setIsVisible }: Props) => {
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
      setIsVisible(true);
    }
  };

  return (
    <>
      <S.Button type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
        제출하기
      </S.Button>
    </>
  );
};

export default SubmitButton;
