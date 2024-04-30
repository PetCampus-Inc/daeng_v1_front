import { FIELD_TO_STEP } from "constants/step";

import { usePostEnrollment } from "hooks/api/member/enroll";
import { Adapter } from "libs/Adapter";
import { MemberFormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { IRequestEnrollment } from "types/member/enrollment.types";

const SubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const { handleSubmit } = useFormContext();
  const enrollMutation = usePostEnrollment();

  const setStep = useSetRecoilState(currentStepState);

  const onSubmit = (data: FieldValues) => {
    // FIXME: memberId, fileUrl 추가 필요
    const requestData = Adapter.from(data).to<FieldValues, IRequestEnrollment>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );
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
    <FormButton type="submit" onClick={handleSubmit(onSubmit, onInvalid)} aria-label="제출하기">
      제출하기
    </FormButton>
  );
};

export default SubmitButton;
