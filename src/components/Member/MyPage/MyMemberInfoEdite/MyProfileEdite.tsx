import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import InputField from "components/common/InputField";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ThemeConfig } from "styles/ThemeConfig";
import { IMemberInfoEdite } from "types/Member.type";

import * as S from "./styles";
import RoleEditeButton from "../Buttons/RoleEditeButton";

const MyProfileEdite = ({ handleFocus, handleBlur, memberData }: IMemberInfoEdite) => {
  // TODO setValue, watch의 경우 이후 기능 추가 후 삭제 여부 판단하기
  const { register, setValue, watch } = useFormContext();
  const [isShowRoles, setIsShowRoles] = useState(false);
  const handleShowRoles = () => {
    setIsShowRoles((prev) => !prev);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.name, e.target.value);
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
          name="nickName"
          register={register}
          isRequired
          borderColor={ThemeConfig.colors.white}
          placeholder="강아지 이름을 입력해주세요"
          defaultValue={memberData.nickName}
          value={watch("nickName")}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeInput}
          className="defaultValue"
        />
        의
      </S.MyDogName>
      <RoleEditeButton
        isShowRoles={isShowRoles}
        handleShowRoles={handleShowRoles}
        relationData={memberData.relation}
      />
    </S.MyProfileWrapper>
  );
};

export default MyProfileEdite;
