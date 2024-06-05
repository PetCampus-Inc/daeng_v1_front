import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfile } from "hooks/api/member/member";
import { Adapter } from "libs/Adapter";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { IMemberProfile } from "types/member/main.types";

import * as S from "../styles";

const SaveProfilButton = () => {
  const { register, setValue, watch, handleSubmit } = useFormContext();
  const mutateMemberProfile = usePostMemberProfile();

  const memberId = watch("memberId");
  const dogId = watch("dogId");
  const memberProfileUri = watch("myProfile");
  const dogProfileUri = watch("dogProfile");
  const dogName = watch("nickName");
  const relation = watch("relation");

  const isDisabled =
    !!memberId && !!dogId && !!memberProfileUri && !!dogProfileUri && !!dogName && !!relation;

  const data = {
    memberId: memberId,
    dogId: dogId,
    memberProfileUri: memberProfileUri,
    dogProfileUri: dogProfileUri,
    dogName: dogName,
    relation: relation
  };

  const handleSubmitData = () => {
    console.log(data);
    console.log(isDisabled);
  };

  return (
    <S.SavaProfileButton>
      <BackgroundButton
        onClick={handleSubmitData}
        backgroundColor="transparent"
        disabled={!isDisabled}
      >
        프로필 완성하기
      </BackgroundButton>
    </S.SavaProfileButton>
  );
};

export default SaveProfilButton;
