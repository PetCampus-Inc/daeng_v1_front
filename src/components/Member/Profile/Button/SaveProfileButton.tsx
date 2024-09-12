import { ACCEPT_FILE_TYPE, FILE_NAME, TYPE_NAME, PATHS } from "constants/s3File";

import { BottomButton } from "components/common/Button";
import { usePostMemberProfile } from "hooks/api/member/member";
import useUploadProfile from "hooks/common/useUploadProfile";
import { useEffect, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

import * as S from "../styles";

// FIXME dirtyFields 사용하지 않는데 해당 상태 추가 안 하면 버튼 활성 안 되는 이슈 해결하기
const SaveProfileButton = () => {
  const {
    handleSubmit,
    getValues,
    formState: { isDirty, dirtyFields }
  } = useFormContext();
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const { s3ProfileData, convertProfileUri, uploadFiles } = useUploadProfile();
  const { mutateMemberProfile } = usePostMemberProfile();

  const memberProfileData = getValues();
  const isAllFilled = Object.values(memberProfileData).every((el: null | undefined) => el ?? false);

  const handleSubmitProfile = (data: FieldValues) => {
    uploadProfileFiles(data);
  };

  const uploadProfileFiles = async (data: FieldValues) => {
    const memberParams = {
      name: TYPE_NAME.MEMBER,
      id: data.memberId,
      files: data.memberProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PATHS.PROFILE
    };

    const dogParams = {
      name: TYPE_NAME.DOG,
      id: data.dogId,
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
    const requestData = {
      dogId: memberProfileData.dogId,
      memberProfileUri: convertProfileUri(FILE_NAME.PROFILE_MEMBER),
      dogProfileUri: convertProfileUri(FILE_NAME.PROFILE_DOG),
      nickName: memberProfileData.nickName,
      relation: memberProfileData.relation
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
    <S.SavaProfileButton>
      <BottomButton
        onClick={handleSubmit(handleSubmitProfile)}
        wrapColor="transparent"
        disabled={!isAllFilled || !isDirty}
      >
        프로필 완성하기
      </BottomButton>
    </S.SavaProfileButton>
  );
};

export default SaveProfileButton;
