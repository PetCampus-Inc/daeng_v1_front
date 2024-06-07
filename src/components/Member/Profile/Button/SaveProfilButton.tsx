import { PATH } from "constants/path";

import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfile } from "hooks/api/member/member";
import useSubmitProfile from "hooks/api/member/useSubmitProfile";
import { useS3Upload } from "hooks/common/useS3";
import { Adapter } from "libs/Adapter";
import { MemberFormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { useEffect } from "react";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { memberHomeStateAtom } from "store/member";
import { EnrollmentInfo } from "types/member/enrollment.types";
import { IMemberProfile } from "types/member/main.types";

import * as S from "../styles";

const SaveProfilButton = () => {
  const { register, setValue, watch, handleSubmit } = useFormContext();
  const mutateMemberProfile = usePostMemberProfile();
  const { uploadFiles, s3ProfileData } = useSubmitProfile();
  const navigate = useNavigate();
  const setMemberHome = useSetRecoilState(memberHomeStateAtom);

  const profileData = {
    memberId: watch("memberId"),
    dogId: watch("dogId"),
    memberProfileUri: watch("memberProfileUri"),
    dogProfileUri: watch("dogProfileUri"),
    nickName: watch("nickName"),
    relation: watch("relation")
  };

  const isDisabled = Object.values(profileData).every((el: null | undefined) => el ?? false);

  const s3MemberUri = s3ProfileData.find((el) => el.split("/").includes("member"));
  const s3DogUri = s3ProfileData.find((el) => el.split("/").includes("dog"));

  console.log("s3MemberUri", s3MemberUri);

  // TODO 어뎁터 데이터에 추가하기
  const getSubmitFormInfo = (data: FieldValues) => {
    return {
      memberId: data.memberId,
      dogId: data.dogId,
      memberProfileUri: s3MemberUri || "",
      dogProfileUri: s3DogUri || "",
      nickName: data.dogName,
      relation: data.relation
    };
  };

  const requestForProfile = async (data: FieldValues) => {
    const memberParams = {
      name: "member",
      id: profileData.memberId,
      files: profileData.memberProfileUri,
      accept: "image/*",
      path: "test_images/agenda/member/profile"
    };

    const dogParams = {
      name: "dog",
      id: profileData.dogId,
      files: profileData.dogProfileUri,
      accept: "image/*",
      path: "test_images/agenda/dog/profile"
    };

    const params = [memberParams, dogParams];

    await uploadFiles(params, {
      onSuccess: () => {
        console.log("성공");
        handleSubmitData(data);
      }
    });
  };

  const handleSubmitData = (data: FieldValues) => {
    const requestData = getSubmitFormInfo(data);
    mutateMemberProfile(requestData, {
      onSuccess: () => {
        navigate(PATH.ROOT);
        setMemberHome({ memberId: requestData.memberId, dogId: requestData.dogId });
      }
    });
  };

  const handleSubmitProfile = (data: FieldValues) => {
    requestForProfile(data);
  };

  console.log("s3ProfileData", s3ProfileData);

  return (
    <S.SavaProfileButton>
      <BackgroundButton
        onClick={handleSubmit(handleSubmitProfile)}
        backgroundColor="transparent"
        disabled={!isDisabled}
      >
        프로필 완성하기
      </BackgroundButton>
    </S.SavaProfileButton>
  );
};

export default SaveProfilButton;
