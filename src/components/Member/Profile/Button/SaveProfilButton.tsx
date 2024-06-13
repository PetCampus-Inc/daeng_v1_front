import { PATH } from "constants/path";
import { ACCEPT_FILE_TYPE, PROFILE_NAME, PROFILE_PATHS } from "constants/profile";

import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfile } from "hooks/api/member/member";
import useSubmitProfile from "hooks/api/member/useSubmitProfile";
import { FieldValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as S from "../styles";

const SaveProfilButton = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = useFormContext();
  const { uploadFiles, s3ProfileData } = useSubmitProfile();
  const mutateMemberProfile = usePostMemberProfile();

  const memebrProfileData = watch();
  const isAllFilled = Object.values(memebrProfileData).every((el: null | undefined) => el ?? false);

  const handleSubmitProfile = (data: FieldValues) => {
    uploadProfileFiles(data);
  };

  const uploadProfileFiles = async (data: FieldValues) => {
    const memberParams = {
      name: PROFILE_NAME.MEMBER,
      id: memebrProfileData.memberId,
      files: memebrProfileData.memberProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PROFILE_PATHS.MEMBER
    };

    const dogParams = {
      name: PROFILE_NAME.DOG,
      id: memebrProfileData.dogId,
      files: memebrProfileData.dogProfileUri,
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
    return s3ProfileData.find((el) => el.split("/").includes(name)) || "";
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
    mutateMemberProfile(requestData, {
      onSuccess: () => {
        navigate(PATH.ROOT);
      }
    });
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

export default SaveProfilButton;
