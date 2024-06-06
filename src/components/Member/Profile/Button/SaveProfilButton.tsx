import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfile } from "hooks/api/member/member";
import { Adapter } from "libs/Adapter";
import { MemberFormToServerAdapter } from "libs/Adapter/FormToServerAdapter";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { EnrollmentInfo } from "types/member/enrollment.types";
import { IMemberProfile } from "types/member/main.types";

import * as S from "../styles";

const SaveProfilButton = () => {
  const { register, setValue, watch, handleSubmit } = useFormContext();
  const mutateMemberProfile = usePostMemberProfile();

  const profileData = {
    memberId: watch("memberId"),
    dogId: watch("dogId"),
    memberProfileUri: watch("memberProfileUri"),
    dogProfileUri: watch("dogProfileUri"),
    dogName: watch("nickName"),
    relation: watch("relation")
  };

  const isDisabled = Object.values(profileData).every((el: null | undefined) => el ?? false);

  // TODO 어뎁터 데이터에 추가하기
  const getSubmitFormInfo = (data: FieldValues) => {
    return {
      memberId: data.memberId,
      dogId: data.dogId,
      memberProfileUri: data.memberProfileUri,
      dogProfileUri: data.dogProfileUri,
      dogName: data.dogName,
      relation: data.relation
    };
  };

  const handleSubmitData = (data: FieldValues) => {
    const requestData = getSubmitFormInfo(data);
    console.log("requestData", requestData);
  };

  return (
    <S.SavaProfileButton>
      <BackgroundButton
        onClick={handleSubmit(handleSubmitData)}
        backgroundColor="transparent"
        disabled={!isDisabled}
      >
        프로필 완성하기
      </BackgroundButton>
    </S.SavaProfileButton>
  );
};

export default SaveProfilButton;
