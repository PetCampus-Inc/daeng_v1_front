import { FIELD } from "constants/field";
import { FILE_NAME, TYPE_NAME } from "constants/s3File";

import { TextInput } from "components/common";
import ProfileUploadBox from "components/Member/Profile/Box/ProfileUploadBox";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { css } from "styled-components";

import * as S from "./styles";
import RoleEditButton from "../Buttons/RoleEditButton";

const MyProfileEdit = () => {
  const { register } = useFormContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isShowRoles, setIsShowRoles] = useState(false);
  const handleShowRoles = () => {
    setIsShowRoles((prev) => !prev);
  };

  return (
    <S.MyProfileWrapper isShowRoles={isShowRoles}>
      <S.ProfileBox>
        <ProfileUploadBox
          type={TYPE_NAME.MEMBER}
          fileRef={fileInputRef}
          fileName={FILE_NAME.PROFILE_MEMBER}
          mode="edit"
        />
      </S.ProfileBox>
      <S.MyDogName>
        <TextInput
          name={FIELD.NICK_NAME}
          register={register}
          placeholder="닉네임을 입력해주세요"
          required
          css={InputStyle}
        />
        의
      </S.MyDogName>
      <RoleEditButton isShowRoles={isShowRoles} handleShowRoles={handleShowRoles} />
    </S.MyProfileWrapper>
  );
};

export default MyProfileEdit;

const InputStyle = css`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};

  ${({ theme }) => theme.typo.body2_16_R};
`;
