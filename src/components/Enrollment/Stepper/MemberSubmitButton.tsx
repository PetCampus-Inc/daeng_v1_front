import { getFieldStep } from "constants/step";

import { usePostMemberEnrollment } from "hooks/api/member/enroll";
import { Adapter, MemberFormToServerAdapter } from "libs/adapters";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { EnrollmentInfoType, MemberGenderType } from "types/member/enrollment.types";

const MemberSubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const { handleSubmit, getValues } = useFormContext();
  const { mutateMemberEnrollment } = usePostMemberEnrollment();

  const setStep = useSetRecoilState(currentStepState);

  const getSubmitFormInfo = (data: FieldValues) => {
    return Adapter.from(data).to<FieldValues, EnrollmentInfoType>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );
  };

  const getMemberData = () => {
    const { memberName, memberGender, address, addressDetail, phoneNumber, emergencyPhoneNumber } =
      getValues();

    // FIXME: fileUrl 추가 필요
    const memberData = {
      memberName: memberName,
      memberGender: memberGender as MemberGenderType,
      address: address || "",
      addressDetail: addressDetail,
      phoneNumber: phoneNumber,
      emergencyPhoneNumber: emergencyPhoneNumber || ""
    };

    return memberData;
  };

  // member - 강아지 추가 및 유치원 재등록
  const onSubmitMember = (data: FieldValues) => {
    const requestData = getSubmitFormInfo(data);
    const memberData = getMemberData();
    const reqData = { ...requestData, ...memberData };

    mutateMemberEnrollment(reqData, {});
  };

  const onInvalid = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors)[0];

    console.log(firstErrorField);

    const step = getFieldStep({ field: firstErrorField, enable: true });

    if (step !== undefined) {
      openPopup(firstErrorField);
      setStep(step);
    }
  };

  return (
    <FormButton
      type="submit"
      onClick={handleSubmit(onSubmitMember, onInvalid)}
      aria-label="제출하기"
    >
      제출하기
    </FormButton>
  );
};

export default MemberSubmitButton;
