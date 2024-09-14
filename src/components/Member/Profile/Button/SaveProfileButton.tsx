import { ACCEPT_FILE_TYPE, TYPE_NAME, PATHS } from "constants/s3File";

import { BottomButton } from "components/common/Button";
import { usePostMemberProfile } from "hooks/api/member/member";
import useUploadProfile from "hooks/common/useUploadProfile";
import { useEffect, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

import * as S from "../styles";

// FIXME 데이터 적용은 되고 있는데 강아지 프로필 사진을 제외한 나머지 데이터가 api와 연동되지 않는거 같아 확인 필요
const SaveProfileButton = () => {
  const {
    handleSubmit,
    getValues,
    formState: { isValid, isDirty }
  } = useFormContext();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const { s3ProfileData, uploadFiles } = useUploadProfile();
  const { mutateMemberProfile } = usePostMemberProfile();

  const handleSubmitProfile = (data: FieldValues) => {
    uploadProfileFiles(data);
  };

  const uploadProfileFiles = async (data: FieldValues) => {
    const memberParams = {
      name: TYPE_NAME.MEMBER,
      files: data.memberProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PATHS.PROFILE
    };

    const dogParams = {
      name: TYPE_NAME.DOG,
      files: data.dogProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PATHS.PROFILE
    };

    const params = [memberParams, dogParams];
    await uploadFiles(params, {
      onSuccess: () => {
        setShouldSubmit(true);
      }
    });
  };

  const submitProfile = () => {
    const formData = getValues();
    // FIXME 구조 나중에 개선하기
    const [memberProfileUri, dogProfileUri] = s3ProfileData;
    const requestData = {
      dogId: formData.dogId,
      memberProfileUri: memberProfileUri,
      dogProfileUri: dogProfileUri,
      nickName: formData.nickName,
      relation: formData.relation
    };
    mutateMemberProfile(requestData);
  };

  useEffect(() => {
    if (shouldSubmit) {
      submitProfile();
      setShouldSubmit(false);
    }
  }, [s3ProfileData, shouldSubmit]);

  return (
    <S.SaveProfileButton>
      <BottomButton
        type="submit"
        onClick={handleSubmit(handleSubmitProfile)}
        wrapColor="transparent"
        disabled={!isDirty || !isValid}
      >
        프로필 완성하기
      </BottomButton>
    </S.SaveProfileButton>
  );
};

export default SaveProfileButton;
