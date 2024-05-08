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
  const address = `${watch("address.street")}${watch("address.detail")}`;
  const phoneNumber = watch("phoneNumber");
  const emergencyNumber = watch("emergencyNumber");
  const relation = watch("relation");

  const checkFormValidity = useCallback(() => {
    if (
      previousValues.memberName !== memberName ||
      previousValues.memberGender !== memberGender ||
      previousValues.nickName !== nickName ||
      previousValues.address !== address ||
      previousValues.phoneNumber !== phoneNumber ||
      previousValues.emergencyNumber !== emergencyNumber ||
      previousValues.relation !== relation
    ) {
      return false;
    }
    return true;
  }, [
    address,
    emergencyNumber,
    memberGender,
    memberName,
    nickName,
    phoneNumber,
    previousValues.address,
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
    memberName: memberName,
    memberGender: memberGender,
    // memberProfileUri: "se_ryusun_smile_face",
    nickName: nickName,
    address: address,
    phoneNumber: phoneNumber,
    emergencyNumber: emergencyNumber,
    relation: relation
  };

  const onSubmit = methods.handleSubmit(() => {
    console.log("updatedMemberInfo", updatedMemberInfo);
    //FIXME 500에러 발생
    // mutatePostMemberInfo.mutateAttend(updatedMemberInfo, {
    //   onError: (err) => {
    //     console.log(err)
    //   },
    //   onSuccess: () => {
    //     console.log('성공')
    //   },
    // });
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
