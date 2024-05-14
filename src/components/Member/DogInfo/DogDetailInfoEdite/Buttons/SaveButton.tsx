import BackgroundButton from "components/common/Button/BackgroundButton";
import { useGetMemberProfileInfo, usePostMemberProfileInfo } from "hooks/api/member/member";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IMemberDogInfo } from "types/member/home.types";

const SaveButton = ({ dogId }: { dogId: number }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const methods = useForm({ mode: "onSubmit" });
  const { watch } = useFormContext();

  // const memberName = watch("memberName");
  // const memberGender = watch("memberGender") === "여" ? "FEMALE" : "MALE";
  // const nickName = watch("nickName");
  // const address = watch("address.street");
  // const addressDetail = watch("address.detail");
  // const phoneNumber = watch("phoneNumber");
  // const emergencyPhoneNumber = watch("emergencyNumber");
  // const relation = watch("relation");

  const updatedDogInfo = {
    dogId: dogId,
    dogName: "string",
    dogGender: "string",
    dogSize: "string",
    breedId: 0,
    newBreed: "string",
    birthDate: "2024-05-14",
    neutralization: "string"
  };

  // const checkFormValidity = useCallback(() => {
  //   if (
  //     previousValues.memberName !== memberName ||
  //     previousValues.memberGender !== memberGender ||
  //     previousValues.nickName !== nickName ||
  //     previousValues.address !== address ||
  //     previousValues.addressDetail !== addressDetail ||
  //     previousValues.phoneNumber !== phoneNumber ||
  //     previousValues.emergencyPhoneNumber !== emergencyPhoneNumber ||
  //     previousValues.relation !== relation
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }, [
  //   address,
  //   addressDetail,
  //   emergencyPhoneNumber,
  //   memberGender,
  //   memberName,
  //   nickName,
  //   phoneNumber,
  //   previousValues.address,
  //   previousValues.addressDetail,
  //   previousValues.emergencyPhoneNumber,
  //   previousValues.memberGender,
  //   previousValues.memberName,
  //   previousValues.nickName,
  //   previousValues.phoneNumber,
  //   previousValues.relation,
  //   relation
  // ]);

  const onSubmit = methods.handleSubmit(() => {
    // mutatePostMemberInfo.mutateAttend(updatedMemberInfo, {
    //   onError: (err) => {
    //     console.log(err);
    //   }
    // });
  });

  // useEffect(() => {
  //   const isValid = checkFormValidity();
  //   setIsDisabled(isValid);
  // }, [checkFormValidity]);

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
