import { FIELD } from "constants/field";

import BackgroundButton from "components/common/Button/BackgroundButton";
import { useGetMemberProfileInfo, usePostMemberProfileInfo } from "hooks/api/member/member";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

const SaveButton = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { memberId } = useParams();
  const methods = useForm({ mode: "onSubmit" });
  const { watch } = useFormContext();
  const mutatePostMemberInfo = usePostMemberProfileInfo(String(memberId));
  const { data: previousValues } = useGetMemberProfileInfo(String(memberId));

  const memberName = watch(FIELD.MEMBER_NAME);
  const memberGender = watch(FIELD.MEMBER_GENDER) === "여" ? "FEMALE" : "MALE";
  const nickName = watch(FIELD.NICK_NAME);
  const address = watch(FIELD.MEMBER_ADDRESS);
  const addressDetail = watch(FIELD.MEMBER_ADDRESS_DETAIL);
  const phoneNumber = watch(FIELD.MEMBER_PHONE);
  const emergencyPhoneNumber = watch(FIELD.EMERGENCY_NUMBER);
  const relation = watch(FIELD.RELATION);

  const updatedMemberInfo = {
    memberId: String(memberId),
    memberName: memberName,
    memberGender: memberGender,
    memberProfileUri: "s3_uri_yubin's_cute_face", // TODO 데이터 연동 필요
    nickName: nickName,
    address: address,
    addressDetail: addressDetail,
    phoneNumber: phoneNumber,
    emergencyPhoneNumber: emergencyPhoneNumber,
    relation: relation
  };

  const checkFormValidity = useCallback(() => {
    if (
      previousValues.memberName !== memberName ||
      previousValues.memberGender !== memberGender ||
      previousValues.nickName !== nickName ||
      previousValues.address !== address ||
      previousValues.addressDetail !== addressDetail ||
      previousValues.phoneNumber !== phoneNumber ||
      previousValues.emergencyPhoneNumber !== emergencyPhoneNumber ||
      previousValues.relation !== relation
    ) {
      return false;
    }
    return true;
  }, [
    address,
    addressDetail,
    emergencyPhoneNumber,
    memberGender,
    memberName,
    nickName,
    phoneNumber,
    previousValues.address,
    previousValues.addressDetail,
    previousValues.emergencyPhoneNumber,
    previousValues.memberGender,
    previousValues.memberName,
    previousValues.nickName,
    previousValues.phoneNumber,
    previousValues.relation,
    relation
  ]);

  const onSubmit = methods.handleSubmit(() => {
    mutatePostMemberInfo.mutateAttend(updatedMemberInfo, {
      onError: (err) => {
        console.log(err);
      }
    });
  });

  useEffect(() => {
    const isValid = checkFormValidity();
    setIsDisabled(isValid);
  }, [checkFormValidity]);

  return (
    <BackgroundButton
      onClick={onSubmit}
      backgroundColor="white"
      buttonBackgroundColor="primaryColor"
      disabled={isDisabled}
    >
      수정 완료
    </BackgroundButton>
  );
};

export default SaveButton;
