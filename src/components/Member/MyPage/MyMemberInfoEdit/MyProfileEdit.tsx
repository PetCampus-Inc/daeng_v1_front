import { FIELD } from "constants/field";
import { FILE_NAME, TYPE_NAME } from "constants/s3File";

import { TextInput } from "components/common";
import ProfileUploadBox from "components/Member/Profile/Box/ProfileUploadBox";
import { useFormContext } from "react-hook-form";
import { css } from "styled-components";

import * as S from "./styles";
import RoleEditButton from "../Buttons/RoleEditButton";

const MyProfileEdit = () => {
  const { register } = useFormContext();

  return (
    <S.MyProfileWrapper>
      <S.ProfileBox>
        <ProfileUploadBox type={TYPE_NAME.MEMBER} fileName={FILE_NAME.PROFILE_MEMBER} mode="edit" />
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
      <RoleEditButton />
    </S.MyProfileWrapper>
  );
};

export default MyProfileEdit;

const InputStyle = css`
  padding: 12px 18px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};

  ${({ theme }) => theme.typo.body2_16_R};
`;
