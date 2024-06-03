import { FIELD_TO_STEP } from "constants/step";

import { usePostEnrollment } from "hooks/api/member/enroll";
import { Adapter } from "libs/Adapter";
import { MemberFormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { EnrollmentInfo } from "types/member/enrollment.types";

// FIXME: 회원가입과 강아지 추가 로직 분리 필요
const SubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const { handleSubmit } = useFormContext();
  const enrollMutation = usePostEnrollment();
  const setStep = useSetRecoilState(currentStepState);

  // 공통 requestData
  const getSubmitFormInfo = (data: FieldValues) => {
    return Adapter.from(data).to<FieldValues, EnrollmentInfo>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );
  };

  // 신규 가입신청서
  const onSubmit = (data: FieldValues) => {
    // FIXME: memberId, fileUrl 추가 필요
    const requestData = getSubmitFormInfo(data);
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
