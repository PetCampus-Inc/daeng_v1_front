import { ACCEPT_FILE_TYPE, PROFILE_NAME, PROFILE_PATHS } from "constants/profile";

import { BackgroundButton } from "components/common/Button";
import { usePostMemberProfile } from "hooks/api/member/member";
import useSubmitProfile from "hooks/api/member/useSubmitProfile";
import { FieldValues, useFormContext } from "react-hook-form";

import * as S from "../styles";

const SaveProfileButton = () => {
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = useFormContext();
  const { uploadFiles, s3ProfileData } = useSubmitProfile();
  const { mutateMemberProfile } = usePostMemberProfile();

  // FIXME: wathc로 데이터를 가져오는 것이 아닌, getValues 통해 가져오는 것으로 변경해주세요!
  const memberProfileData = watch();
  const isAllFilled = Object.values(memberProfileData).every((el: null | undefined) => el ?? false);

  const handleSubmitProfile = (data: FieldValues) => {
    uploadProfileFiles(data);
  };

  const uploadProfileFiles = async (data: FieldValues) => {
    const memberParams = {
      name: PROFILE_NAME.MEMBER,
      id: memberProfileData.memberId,
      files: memberProfileData.memberProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PROFILE_PATHS.MEMBER
    };

    const dogParams = {
      name: PROFILE_NAME.DOG,
      id: memberProfileData.dogId,
      files: memberProfileData.dogProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PROFILE_PATHS.DOG
    };

    const params = [memberParams, dogParams];

    await uploadFiles(params, {
      onSuccess: () => {
        submitMemberProfile(data);
      }
    });
  };

  const convertProfileUri = (name: string) => {
    return s3ProfileData.find((file) => file.split("/").includes(name)) || "";
  };

  // TODO 어뎁터 데이터에 추가하기
  const getSubmitFormData = (data: FieldValues) => {
    return {
      memberId: data.memberId,
      dogId: data.dogId,
      memberProfileUri: convertProfileUri(PROFILE_NAME.MEMBER),
      dogProfileUri: convertProfileUri(PROFILE_NAME.DOG),
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
      <BackgroundButton
        onClick={handleSubmit(handleSubmitProfile)}
        backgroundColor="transparent"
        disabled={!isValid || !isAllFilled}
      >
        프로필 완성하기
      </BackgroundButton>
    </S.SavaProfileButton>
  );
};

export default SaveProfileButton;
