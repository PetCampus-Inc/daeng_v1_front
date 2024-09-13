import { ACCEPT_FILE_TYPE, FILE_NAME, TYPE_NAME, PATHS } from "constants/s3File";

import { BottomButton } from "components/common/Button";
import { usePostMemberProfile } from "hooks/api/member/member";
import useUploadProfile from "hooks/common/useUploadProfile";
import { FieldValues, useFormContext } from "react-hook-form";

import * as S from "../styles";

// FIXME dirtyFields 사용하지 않는데 해당 상태 추가 안 하면 버튼 활성 안 되는 이슈 해결하기
const SaveProfileButton = () => {
  const {
    handleSubmit,
    getValues,
    formState: { isDirty, dirtyFields }
  } = useFormContext();
  const { convertProfileUri, uploadFiles } = useUploadProfile();
  const { mutateMemberProfile } = usePostMemberProfile();
  const memberProfileData = getValues();
  const isAllFilled = Object.values(memberProfileData).every((el: null | undefined) => el ?? false);

  const handleSubmitProfile = (data: FieldValues) => {
    uploadProfileFiles(data);
  };

  const uploadProfileFiles = async (data: FieldValues) => {
    const memberParams = {
      name: TYPE_NAME.MEMBER,
      files: memberProfileData.memberProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PATHS.PROFILE
    };

    const dogParams = {
      name: TYPE_NAME.DOG,
      files: memberProfileData.dogProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PATHS.PROFILE
    };

    const params = [memberParams, dogParams];

    await uploadFiles(params, {
      onSuccess: () => {
        submitMemberProfile(data);
      }
    });
  };

  const getSubmitFormData = (data: FieldValues) => {
    return {
      dogId: data.dogId,
      memberProfileUri: convertProfileUri(FILE_NAME.PROFILE_MEMBER),
      dogProfileUri: convertProfileUri(FILE_NAME.PROFILE_DOG),
      nickName: data.nickName,
      relation: data.relation
    };
  };

  const submitMemberProfile = (data: FieldValues) => {
    const requestData = getSubmitFormData(data);
    mutateMemberProfile(requestData);
  };

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
