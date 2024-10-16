import { ACCEPT_FILE_TYPE } from "constants/s3File";

import placeholderImg from "assets/images/placeholder-dog.png";
import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { Flex } from "components/common/Flex";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import * as S from "../styles";

interface ProfileEditProps {
  profile: IFile[];
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
  handleClick?: () => void;
  registerText: string;
  type: string;
}

const ProfileEdit = ({
  profile,
  handleFileChange,
  handleClick,
  registerText,
  type
}: ProfileEditProps) => {
  // FIXME label 태그에 onClick 넣어도 상관 없는지 확인 필요
  const { register, getValues } = useFormContext();
  const { profileUri } = getValues();
  return (
    <Flex align="center" direction="column" justify="center" gap="12" width="100%">
      <S.ProfileBox w="107" h="108">
        <S.ProfileLabel htmlFor={registerText} onClick={handleClick}>
          <S.UploadProfileBox br="40" aria-label="uploadProfileButton">
            <S.UploadImage
              src={profile[0] ? profile[0].thumbnail : (profileUri ?? placeholderImg)}
              alt={`${type}-profile`}
            />
          </S.UploadProfileBox>
          <S.PencilIconBox>
            <PencilBrownNormalIcon />
          </S.PencilIconBox>
        </S.ProfileLabel>
      </S.ProfileBox>

      <S.StyledHiddenUpload
        {...register(registerText, {
          onChange: (e) => handleFileChange(e, type)
        })}
        id={registerText}
        type="file"
        accept={ACCEPT_FILE_TYPE.IMAGE}
      />
    </Flex>
  );
};

export default ProfileEdit;
