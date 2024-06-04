import BackgroundButton from "components/common/Button/BackgroundButton";
import { usePostMemberProfile } from "hooks/api/member/member";
import { Adapter } from "libs/Adapter";
import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";
import { IMemberProfile } from "types/member/home.types";

import * as S from "../styles";

const SaveProfilButton = () => {
  const { register, setValue, watch, handleSubmit } = useFormContext();
  const mutateMemberProfile = usePostMemberProfile();

  const handleSubmitData = () => {
    const data = {
      memberId: 1,
      dogId: 1,
      memberProfileUri: watch("myProfile"),
      dogProfileUri: watch("dogProfile"),
      dogName: watch("nickName"),
      relation: watch("relation")
    };
  };

  return (
    <S.SavaProfileButton>
      <BackgroundButton backgroundColor="transparent" disabled>
        프로필 완성하기
      </BackgroundButton>
    </S.SavaProfileButton>
  );
};

export default SaveProfilButton;
