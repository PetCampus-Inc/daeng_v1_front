import { FIELD } from "constants/field";

import { BackgroundButton } from "components/common/Button";
import { usePostMemberDogDetailInfo } from "hooks/api/member/member";
import { useFormContext } from "react-hook-form";
import { type MemberDogInfoReq } from "types/member/main.types";
import { getKeyForLabel } from "utils/formatter";

const SaveButton = ({ dogId }: { dogId: number }) => {
  const {
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting }
  } = useFormContext();
  const { mutatePostDogDetailInfo } = usePostMemberDogDetailInfo(dogId);

  const getFormValues = (): MemberDogInfoReq => {
    const formData = getValues();
    return {
      dogId,
      dogName: formData[FIELD.DOG_NAME],
      dogGender: formData[FIELD.DOG_GENDER] === "암컷" ? "FEMALE" : "MALE",
      dogSize: getKeyForLabel(FIELD.DOG_SIZE, formData[FIELD.DOG_SIZE]) || "",
      breedId: formData[FIELD.BREED_ID],
      newBreed: formData[FIELD.NEW_BREED],
      birthDate: `${formData["year"]}-${formData["month"]}-${formData["day"]}`,
      neutralization: formData[FIELD.NEUTRALIZATION] === "했어요" ? "NEUTERED" : "NOT_NEUTERED"
    };
  };

  const onSubmit = () => {
    const requestData = getFormValues();
    mutatePostDogDetailInfo(requestData);
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
