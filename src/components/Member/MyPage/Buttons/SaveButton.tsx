import { FIELD } from "constants/field";

import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfileInfo } from "hooks/api/member/member";
import { useFormContext } from "react-hook-form";

import type { IMemberProfilePostInfo } from "types/member/main.types";

const SaveButton = ({ memberId }: { memberId: string }) => {
  const {
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting }
  } = useFormContext();

  const { mutateProfileInfo } = usePostMemberProfileInfo(memberId);

  const getFormValues = (): IMemberProfilePostInfo => {
    const formData = getValues();
    return {
      memberId,
      memberName: formData[FIELD.MEMBER_NAME],
      memberGender: formData[FIELD.MEMBER_GENDER] === "여" ? "FEMALE" : "MALE",
      memberProfileUri: "", // TODO 데이터 연동 필요
      nickName: formData[FIELD.NICK_NAME],
      address: formData[FIELD.MEMBER_ADDRESS],
      addressDetail: formData[FIELD.MEMBER_ADDRESS_DETAIL],
      phoneNumber: formData[FIELD.MEMBER_PHONE],
      emergencyPhoneNumber: formData[FIELD.EMERGENCY_NUMBER],
      relation: formData[FIELD.RELATION]
    };
  };

  const onSubmit = () => {
    const requestData = getFormValues();
    mutateProfileInfo(requestData);
  };

  return (
    <BackgroundButton
      onClick={handleSubmit(onSubmit)}
      backgroundColor="white"
      buttonBackgroundColor="primaryColor"
      disabled={!isDirty || !isValid || isSubmitting}
    >
      수정 완료
    </BackgroundButton>
  );
};

export default SaveButton;
