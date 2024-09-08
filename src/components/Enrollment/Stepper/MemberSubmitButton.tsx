import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";
import { getFieldStep } from "constants/step";

import { useQueryClient } from "@tanstack/react-query";
import { useEnrollmentStorage } from "components/Member/MyPage/hooks/useEnrollmentStorage";
import { usePostEnrollment } from "hooks/api/member/enroll";
import { Adapter, MemberFormToServerAdapter } from "libs/adapters";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { EnrollmentInfoType, MemberGenderType } from "types/member/enrollment.types";

const MemberSubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleSubmit, getValues } = useFormContext();
  const { mutateEnrollment } = usePostEnrollment();
  const { createStorageEnrollment } = useEnrollmentStorage();

  const setStep = useSetRecoilState(currentStepState);

  const getSubmitFormInfo = (data: FieldValues) => {
    return Adapter.from(data).to<FieldValues, EnrollmentInfoType>((item) =>
      new MemberFormToServerAdapter(item).adapt()
    );
  };

  const getMemberData = () => {
    const {
      memberId,
      memberName,
      memberGender,
      address,
      addressDetail,
      phoneNumber,
      emergencyPhoneNumber
    } = getValues();

    // FIXME: fileUrl 추가 필요
    const memberData = {
      memberId: memberId,
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
    const { dogName } = getValues();
    const requestData = getSubmitFormInfo(data);
    const memberData = getMemberData();
    const reqData = { ...requestData, ...memberData };

    mutateEnrollment(reqData, {
      onSuccess: (enrollmentFormId) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_INFO });
        navigate(PATH.MEMBER_MY_PAGE);

        createStorageEnrollment(String(enrollmentFormId), dogName);
      }
    });
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
