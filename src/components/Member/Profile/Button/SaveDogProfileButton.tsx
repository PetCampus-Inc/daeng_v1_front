import { ACCEPT_FILE_TYPE, TYPE_NAME, PATHS } from "constants/s3File";

import { BottomButton } from "components/common/Button";
import { usePostDogProfile } from "hooks/api/member/member";
import useUploadProfile from "hooks/common/useUploadProfile";
import { useEffect, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

import * as S from "../styles";

const SaveDogProfileButton = () => {
  const {
    handleSubmit,
    getValues,
    formState: { isValid, isDirty }
  } = useFormContext();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const { s3ProfileData, uploadFiles } = useUploadProfile();
  const { mutateDogProfile } = usePostDogProfile();

  const handleSubmitProfile = (data: FieldValues) => {
    uploadProfileFiles(data);
  };

  const uploadProfileFiles = async (data: FieldValues) => {
    const dogParams = {
      name: TYPE_NAME.DOG,
      id: data.dogId,
      files: data.dogProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PATHS.PROFILE
    };

    const params = [dogParams];

    await uploadFiles(params, {
      onSuccess: () => {
        setShouldSubmit(true);
      }
    });
  };

  const submitDogProfile = () => {
    const { dogId } = getValues();
    const requestData = {
      dogId: dogId,
      profileUrl: s3ProfileData[0]
    };
    mutateDogProfile(requestData);
  };

  useEffect(() => {
    if (shouldSubmit) {
      submitDogProfile();
      setShouldSubmit(false);
    }
  }, [s3ProfileData, shouldSubmit]);

  return (
    <S.SavaProfileButton>
      <BottomButton
        onClick={handleSubmit(handleSubmitProfile)}
        wrapColor="transparent"
        disabled={!isValid || !isDirty}
      >
        프로필 완성하기
      </BottomButton>
    </S.SavaProfileButton>
  );
};

export default SaveDogProfileButton;
