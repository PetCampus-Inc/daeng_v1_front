import { FIELD_TO_STEP } from "constants/step";

import { usePostEnrollment } from "hooks/api/enroll";
import { useFormContext, type FieldErrors } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { EnrollmentFormTransformer } from "utils/formTransformer";

import * as S from "./styles";

const SubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const { handleSubmit } = useFormContext();
  const enrollMutation = usePostEnrollment();

  const setStep = useSetRecoilState(currentStepState);

  const onSubmit = (data: object) => {
    // FIXME: schoolFormId, memberId, fileUrl 추가 필요
    const transformer = new EnrollmentFormTransformer(data);
    const requestData = transformer.transform();

    enrollMutation(requestData);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
    const firstErrorField = Object.keys(errors)[0];
    const step = FIELD_TO_STEP.get(firstErrorField);
    if (step !== undefined) {
      openPopup(firstErrorField);
      setStep(step);
    }
  };

  return (
    <S.Button type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
      제출하기
    </S.Button>
  );
};

export default SubmitButton;
