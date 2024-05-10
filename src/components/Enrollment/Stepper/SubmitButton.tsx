import { FIELD_TO_STEP } from "constants/step";

import { usePostEnrollment } from "hooks/api/member/enroll";
import { useGetMemberProfileInfo } from "hooks/api/member/member";
import { Adapter } from "libs/Adapter";
import { MemberFormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { IRequestEnrollment } from "types/member/enrollment.types";

const SubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const { memberId } = useParams();
  const { handleSubmit } = useFormContext();
  const enrollMutation = usePostEnrollment();
  const { data: memberInfoData } = useGetMemberProfileInfo(String(memberId));

  const setStep = useSetRecoilState(currentStepState);

  // TODO memberInfo데이터 recoil로 분리 등 리팩토링 필요
  const memberInfo = {
    memberId: Number(memberInfoData.memberId),
    memberName: memberInfoData.memberName,
    memberGender: memberInfoData.memberGender,
    address: `${memberInfoData.address && memberInfoData.address} ${memberInfoData.address && memberInfoData.addressDetail}`,
    phoneNumber: memberInfoData.phoneNumber,
    emergencyNumber: memberInfoData.emergencyPhoneNumber
      ? memberInfoData.emergencyPhoneNumber
      : null
  };

  const onSubmit = (data: FieldValues) => {
    // FIXME: memberId, fileUrl 추가 필요
    const requestData = Adapter.from(data).to<FieldValues, IRequestEnrollment>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );

    enrollMutation(requestData);
  };

  // TODO /member url 일 경우 해당 함수 실행 (member 강아지 추가)
  const onSubmitMemberDogAdd = (data: FieldValues) => {
    // FIXME: fileUrl 추가 필요
    const requestData = Adapter.from(data).to<FieldValues, IRequestEnrollment>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );

    const memberDogAddInfo = { ...requestData, ...memberInfo };
    enrollMutation(memberDogAddInfo);
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
