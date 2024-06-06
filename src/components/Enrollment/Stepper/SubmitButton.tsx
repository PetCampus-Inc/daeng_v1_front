import { getFieldStep } from "constants/step";

import { usePostEnrollment } from "hooks/api/member/enroll";
import { Adapter, MemberFormToServerAdapter } from "libs/adapters";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { EnrollmentInfoType } from "types/member/enrollment.types";

const SubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const { handleSubmit } = useFormContext();
  const { mutateEnrollment } = usePostEnrollment();
  const setStep = useSetRecoilState(currentStepState);

  const getSubmitFormInfo = (data: FieldValues) => {
    return Adapter.from(data).to<FieldValues, EnrollmentInfoType>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );
  };

  // 신규 가입신청서
  const onSubmit = (data: FieldValues) => {
    const requestData = getSubmitFormInfo(data);

    console.log(requestData);

    mutateEnrollment(requestData);
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
    const firstErrorField = Object.keys(errors)[0];

    console.log(firstErrorField);
    const step = getFieldStep({ field: firstErrorField, enable: true });

    console.log(step);

    if (step !== undefined) {
      console.log(step);
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
