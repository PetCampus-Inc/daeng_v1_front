import { FIELD } from "constants/field";
import { ACCEPT_FILE_TYPE, FILE_NAME, TYPE_NAME, PATHS } from "constants/s3File";

import { BackgroundButton } from "components/common/Button";
import { usePostMemberDogDetailInfo } from "hooks/api/member/member";
import useUploadProfile from "hooks/common/useUploadProfile";
import { useFormContext } from "react-hook-form";
import { type MemberDogInfoReq } from "types/member/main.types";
import { getKeyForLabel } from "utils/formatter";

const SaveButton = ({ dogId }: { dogId: number }) => {
  const {
    getValues,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting }
  } = useFormContext();

  const { convertProfileUri, uploadFiles } = useUploadProfile();
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
      profileUri: formData[FILE_NAME.PROFILE_COMMON],
      birthDate: `${formData["year"]}-${formData["month"]}-${formData["day"]}`,
      neutralization: formData[FIELD.NEUTRALIZATION] === "했어요" ? "NEUTERED" : "NOT_NEUTERED"
    };
  };

  const handleSubmitData = () => {
    const { profileUri } = getFormValues();

    // profileUri 파일 수정 할 경우
    if (typeof profileUri !== "string") uploadProfileFiles(profileUri);
    // profileUri 파일 수정 안 할 경우
    else onSubmit();
  };

  const uploadProfileFiles = async (profileUri: FileList) => {
    const dogParams = {
      name: TYPE_NAME.DOG,
      id: dogId,
      files: profileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PATHS.PROFILE
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
      profileUri: convertProfileUri(TYPE_NAME.DOG)
    });
    mutatePostDogDetailInfo(requestData);
  };

  return (
    <BackgroundButton
      onClick={handleSubmit(handleSubmitData)}
      backgroundColor="white"
      buttonBackgroundColor="primaryColor"
      disabled={!isDirty || !isValid || isSubmitting}
    >
      수정 완료
    </BackgroundButton>
  );
};

export default SaveButton;
