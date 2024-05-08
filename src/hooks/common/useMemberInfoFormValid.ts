import { useGetMemberProfileInfo } from "hooks/api/member/member";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const useMemberInfoFormValid = (memberId: string) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { watch } = useFormContext();
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

  useEffect(() => {
    const isValid = checkFormValidity();
    setIsDisabled(isValid);
  }, [checkFormValidity]);

  return {
    isDisabled,
    memberName,
    memberGender,
    nickName,
    address,
    phoneNumber,
    emergencyNumber,
    relation
  };
};

export default useMemberInfoFormValid;
