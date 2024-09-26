import { FIELD } from "constants/field";
import { ACCEPT_FILE_TYPE, FILE_NAME, TYPE_NAME, PATHS } from "constants/s3File";

import { BottomButton } from "components/common/Button";
import { usePostMemberDogDetailInfo } from "hooks/api/member/member";
import useUploadProfile from "hooks/common/useUploadProfile";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { type MemberDogInfoReq } from "types/member/main.types";
import { getKeyForLabel } from "utils/formatter";

const SaveButton = ({ dogId }: { dogId: number }) => {
  const { getValues, handleSubmit } = useFormContext();

  const [shouldSubmit, setShouldSubmit] = useState(false);
  const { s3ProfileData, uploadFiles } = useUploadProfile();
  const { mutatePostDogDetailInfo } = usePostMemberDogDetailInfo(dogId);

  const getFormValues = (): MemberDogInfoReq => {
    const formData = getValues();
    return {
      dogId,
      dogName: formData[FIELD.DOG_NAME],
      dogGender: formData[FIELD.DOG_GENDER] === "암컷" ? "FEMALE" : "MALE",
      dogSize: getKeyForLabel(FIELD.DOG_SIZE, formData[FIELD.DOG_SIZE]),
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
    onSubmit();
    await uploadFiles(params, {
      onSuccess: () => {
        setShouldSubmit(true);
      }
    });
  };

  const onSubmit = () => {
    const formData = getFormValues();
    const { profileUri } = formData;
    const [dogProfileUri] = s3ProfileData;
    const requestData = Object.assign(formData, {
      profileUri: typeof profileUri === "string" ? profileUri : dogProfileUri
    });
    mutatePostDogDetailInfo(requestData);
    console.log("requestData", requestData);
  };

  useEffect(() => {
    if (shouldSubmit) {
      onSubmit();
      setShouldSubmit(false);
    }
  }, [s3ProfileData, shouldSubmit]);

  return (
    <BottomButton onClick={handleSubmit(handleSubmitData)} position="relative">
      수정 완료1
    </BottomButton>
  );
};

export default SaveButton;
