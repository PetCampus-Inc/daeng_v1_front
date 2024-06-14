import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { TextInput } from "components/common";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { css } from "styled-components";

import * as S from "./styles";
import RoleEditeButton from "../Buttons/RoleEditeButton";

import type { IMemberInfoEdite } from "types/member/member.types";

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
        <TextInput
          register={register}
          {...register("nickName", { required: true })}
          placeholder="닉네임을 입력해주세요"
          defaultValue={memberData.nickName}
          value={watch("nickName")}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChangeInput}
          className="defaultValue"
          css={InputStyle}
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

const InputStyle = css`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};

  ${({ theme }) => theme.typo.body2_16_R};
`;
