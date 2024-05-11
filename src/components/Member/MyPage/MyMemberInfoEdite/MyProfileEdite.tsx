import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { TextInput } from "components/common";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { css } from "styled-components";
import { IMemberInfoEdite } from "types/Member.type";

import * as S from "./styles";
import RoleEditeButton from "../Buttons/RoleEditeButton";

const MyProfileEdite = ({ handleFocus, handleBlur }: IMemberInfoEdite) => {
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
        <TextInput
          {...register("dodName", { required: true })}
          placeholder="강아지 이름을 입력해주세요"
          value="뽀뽀"
          onFocus={handleFocus}
          onBlur={handleBlur}
          css={InputStyle}
        />
        의
      </S.MyDogName>
      <RoleEditeButton isShowRoles={isShowRoles} handleShowRoles={handleShowRoles} />
    </S.MyProfileWrapper>
  );
};

export default MyProfileEdite;

const InputStyle = css`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};

  ${({ theme }) => theme.typo.body2_16_R};
`;
