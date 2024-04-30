import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import InputField from "components/common/InputField";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ThemeConfig } from "styles/ThemeConfig";

import * as S from "./styles";
import RoleEditeButton from "../Buttons/RoleEditeButton";

const MyProfileEdite = () => {
  // TODO setValue, watch의 경우 이후 기능 추가 후 삭제 여부 판단하기
  const { register, setValue, watch } = useFormContext();
  const [isShowRoles, setIsShowRoles] = useState(false);
  const handleShowRoles = () => {
    console.log("호칭");
    setIsShowRoles((prev) => !prev);
  };

  return (
    <S.MyProfileWrapper isShowRoles={isShowRoles}>
      <S.ProfileBox>
        <S.ProfileEditeBox>
          <S.UserImage
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user_profile"
          />
          <S.ProfileEditeButton>
            <PencilBrownNormalIcon />
          </S.ProfileEditeButton>
        </S.ProfileEditeBox>
      </S.ProfileBox>
      <S.MyDogName>
        <InputField
          name="dogName"
          register={register}
          isRequired
          borderColor={ThemeConfig.colors.white}
          placeholder="강아지 이름을 입력해주세요"
          value="뽀뽀"
        />
        의
      </S.MyDogName>
      <RoleEditeButton isShowRoles={isShowRoles} handleShowRoles={handleShowRoles} />
    </S.MyProfileWrapper>
  );
};

export default MyProfileEdite;
