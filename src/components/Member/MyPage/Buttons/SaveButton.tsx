import BackgroundButton from "components/common/Button/BackgroundButton";
import { useGetMemberProfileInfo, usePostMemberProfileInfo } from "hooks/api/member/member";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

const SaveButton = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { watch } = useFormContext();
  const { memberId } = useParams();
  const methods = useForm({ mode: "onSubmit" });
  const mutatePostMemberInfo = usePostMemberProfileInfo();
  const { data: previousValues } = useGetMemberProfileInfo(String(memberId));

  const memberName = watch("memberName");
  const memberGender = watch("memberGender") === "여" ? "FEMALE" : "MALE";
  const nickName = watch("nickName");
  const address = watch("address.street");
  const addressDetail = watch("address.detail");
  const phoneNumber = watch("phoneNumber");
  const emergencyPhoneNumber = watch("emergencyNumber");
  const relation = watch("relation");

  const checkFormValidity = useCallback(() => {
    if (
      previousValues.memberName !== memberName ||
      previousValues.memberGender !== memberGender ||
      previousValues.nickName !== nickName ||
      previousValues.address !== address ||
      previousValues.addressDetail !== addressDetail ||
      previousValues.phoneNumber !== phoneNumber ||
      previousValues.emergencyNumber !== emergencyPhoneNumber ||
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
    previousValues.emergencyNumber,
    previousValues.memberGender,
    previousValues.memberName,
    previousValues.nickName,
    previousValues.phoneNumber,
    previousValues.relation,
    relation
  ]);

  const updatedMemberInfo = {
    memberId: String(memberId),
    memberName: String(memberName),
    memberGender: String(memberGender),
    memberProfileUri: "s3_uri_yubin's_cute_face",
    nickName: String(nickName),
    address: String(address),
    addressDetail: String(addressDetail),
    phoneNumber: String(phoneNumber),
    emergencyPhoneNumber: String(emergencyPhoneNumber),
    relation: String(relation)
  };

  const onSubmit = methods.handleSubmit(() => {
    console.log("updatedMemberInfo", updatedMemberInfo);
    //FIXME 500에러 발생
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
