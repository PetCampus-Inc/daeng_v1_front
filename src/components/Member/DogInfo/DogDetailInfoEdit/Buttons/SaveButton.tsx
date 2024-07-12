import { FIELD } from "constants/field";
import { ACCEPT_FILE_TYPE, FILE_URI_NAME, PROFILE_NAME, PROFILE_PATHS } from "constants/profile";

import { BackgroundButton } from "components/common/Button";
import { usePostMemberDogDetailInfo } from "hooks/api/member/member";
import useSubmitProfile from "hooks/common/useSubmitProfile";
import { useFormContext } from "react-hook-form";
import { type MemberDogInfoReq } from "types/member/main.types";
import { getKeyForLabel } from "utils/formatter";

const SaveButton = ({ dogId }: { dogId: number }) => {
  const {
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting }
  } = useFormContext();

  const { uploadFiles, s3ProfileData } = useSubmitProfile();
  const { mutatePostDogDetailInfo } = usePostMemberDogDetailInfo(dogId);

  const convertProfileUri = (name: string) => {
    return s3ProfileData.find((file) => file.split("/").includes(name)) || "";
  };

  const getFormValues = (): MemberDogInfoReq => {
    const formData = getValues();
    return {
      dogId,
      dogName: formData[FIELD.DOG_NAME],
      dogGender: formData[FIELD.DOG_GENDER] === "암컷" ? "FEMALE" : "MALE",
      dogSize: getKeyForLabel(FIELD.DOG_SIZE, formData[FIELD.DOG_SIZE]) || "",
      breedId: formData[FIELD.BREED_ID],
      newBreed: formData[FIELD.NEW_BREED],
      profileUri: formData[FILE_URI_NAME.COMMON],
      birthDate: `${formData["year"]}-${formData["month"]}-${formData["day"]}`,
      neutralization: formData[FIELD.NEUTRALIZATION] === "했어요" ? "NEUTERED" : "NOT_NEUTERED"
    };
  };

  const handleSubmitInfo = () => {
    const { profileUri } = getFormValues();
    // profileUri 파일 수정 할 경우/안 할 경우
    if (typeof profileUri !== "string") uploadProfileFiles(profileUri);
    else onSubmit();
  };

  const uploadProfileFiles = async (profileUri: FileList) => {
    const dogParams = {
      name: PROFILE_NAME.DOG,
      id: dogId,
      files: profileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PROFILE_PATHS.DOG
    };

    const params = [dogParams];

    await uploadFiles(params, {
      onSuccess: () => {
        onSubmit();
      }
    });
  };

  const onSubmit = () => {
    const formData = getFormValues();
    const requestData = Object.assign(formData, {
      profileUri: convertProfileUri(PROFILE_NAME.DOG)
    });
    mutatePostDogDetailInfo(requestData);
    console.log("requestData", requestData);
  };

  return (
    <BackgroundButton
      onClick={handleSubmit(handleSubmitInfo)}
      backgroundColor="white"
      buttonBackgroundColor="primaryColor"
      disabled={!isDirty || !isValid || isSubmitting}
    >
      수정 완료
    </BackgroundButton>
  );
};

export default SaveButton;
