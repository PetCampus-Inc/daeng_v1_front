import { PATH } from "constants/path";
import { ACCEPT_FILE_TYPE, PROFILE_NAME, PROFILE_PATHS } from "constants/profile";

import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfile } from "hooks/api/member/member";
import useSubmitProfile from "hooks/api/member/useSubmitProfile";
import { FieldValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as S from "../styles";

const SaveProfilButton = () => {
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = useFormContext();
  const mutateMemberProfile = usePostMemberProfile();
  const { uploadFiles, s3ProfileData } = useSubmitProfile();
  const navigate = useNavigate();

  const profileData = watch();

  const s3MemberUri = s3ProfileData.find((el) => el.split("/").includes("member"));
  const s3DogUri = s3ProfileData.find((el) => el.split("/").includes("dog"));
  const isAllFilled = Object.values(profileData).every((el: null | undefined) => el ?? false);

  const handleSubmitProfile = (data: FieldValues) => {
    uploadProfileFiles(data);
  };

  const uploadProfileFiles = async (data: FieldValues) => {
    const memberParams = {
      name: PROFILE_NAME.MEMBER,
      id: profileData.memberId,
      files: profileData.memberProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PROFILE_PATHS.MEMBER
    };

    const dogParams = {
      name: PROFILE_NAME.DOG,
      id: profileData.dogId,
      files: profileData.dogProfileUri,
      accept: ACCEPT_FILE_TYPE.IMAGE,
      path: PROFILE_PATHS.DOG
    };

    const params = [memberParams, dogParams];

    await uploadFiles(params, {
      onSuccess: () => {
        console.log("성공");
        submitMemberProfile(data);
      }
    });
  };

  // TODO 어뎁터 데이터에 추가하기
  const getSubmitFormData = (data: FieldValues) => {
    return {
      memberId: data.memberId,
      dogId: data.dogId,
      memberProfileUri: s3MemberUri || "",
      dogProfileUri: s3DogUri || "",
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
    console.log("requestData", requestData);
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
