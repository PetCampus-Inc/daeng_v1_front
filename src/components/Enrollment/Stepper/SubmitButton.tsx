import { PATH } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";
import { FIELD_TO_STEP } from "constants/step";

import { useQueryClient } from "@tanstack/react-query";
import { usePostEnrollment } from "hooks/api/member/enroll";
import { useGetMemberProfileInfo } from "hooks/api/member/member";
import { Adapter } from "libs/Adapter";
import { MemberFormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { FieldValues, useFormContext, type FieldErrors } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentStepState } from "store/form";
import { FormButton } from "styles/StyleModule";

import type { EnrollmentInfo, MemberGenderType } from "types/member/enrollment.types";

// FIXME: 회원가입과 강아지 추가 로직 분리 필요
const SubmitButton = ({ openPopup }: { openPopup: (field: string) => void }) => {
  const queryClient = useQueryClient();
  const { memberId } = useParams();
  const navigate = useNavigate();
  const isMypage = useLocation()
    .pathname.split("/")
    .some((url) => url === "mypage");
  const { handleSubmit } = useFormContext();
  const enrollMutation = usePostEnrollment();
  const { data: memberInfoData } = useGetMemberProfileInfo(String(memberId));

  const setStep = useSetRecoilState(currentStepState);

  // TODO memberInfo데이터 recoil로 분리 등 리팩토링 필요
  const memberInfo = {
    dogId: 0, // 신규 강아지의 경우
    memberId: Number(memberInfoData.memberId),
    memberName: memberInfoData.memberName,
    memberGender: memberInfoData.memberGender as MemberGenderType,
    address: `${memberInfoData.address && memberInfoData.address}`,
    addressDetail: `${memberInfoData.address && memberInfoData.addressDetail}`,
    phoneNumber: memberInfoData.phoneNumber,
    emergencyNumber: memberInfoData.emergencyPhoneNumber
      ? memberInfoData.emergencyPhoneNumber
      : null
  };

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

  // member 강아지 추가
  const onSubmitMemberDogAdd = (data: FieldValues) => {
    // FIXME: fileUrl 추가 필요
    const requestData = getSubmitFormInfo(data);

    const memberDogAddInfo = { ...requestData, ...memberInfo };
    enrollMutation(memberDogAddInfo, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_INFO(String(memberId)) });
        navigate(PATH.MEMBER_MY_PAGE(memberId));
      }
    });
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
    <FormButton
      type="submit"
      onClick={handleSubmit(isMypage ? onSubmitMemberDogAdd : onSubmit, onInvalid)}
      aria-label="제출하기"
    >
      제출하기
    </FormButton>
  );
};

export default SubmitButton;
