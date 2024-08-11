import { ACCEPT_FILE_TYPE } from "constants/s3File";

import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { Flex } from "components/common/Flex";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import * as S from "../styles";

interface ProfileEditProps {
  handleClick: (type: string) => void;
  profile: IFile[];
  fileInputRef: React.LegacyRef<HTMLInputElement> | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
  registerText: string;
  type: string;
}

const ProfileEdit = ({
  handleClick,
  profile,
  fileInputRef,
  handleFileChange,
  registerText,
  type
}: ProfileEditProps) => {
  const { register, getValues } = useFormContext();
  const { profileUri } = getValues();
  return (
    <Flex align="center" direction="column" justify="center" gap="12" width="100%">
      <S.ProfileBox htmlFor="uploadProfile" w="107" onClick={() => handleClick(type)}>
        <S.UploadProfileButton br="40" aria-label="uploadProfileButton">
          <S.UploadImage
            src={profile[0] ? profile[0].thumbnail : profileUri}
            alt={`${type}-profile`}
          />
        </S.UploadProfileButton>
        <S.PencilIconBox>
          <PencilBrownNormalIcon />
        </S.PencilIconBox>
      </S.ProfileBox>

      <S.StyledHiddenUpload
        {...register(registerText)}
        id="uploadProfile"
        type="file"
        ref={fileInputRef}
        accept={ACCEPT_FILE_TYPE.IMAGE}
        onChange={(e) => handleFileChange(e, type)}
      />
    </Flex>
  );
};

export default ProfileEdit;
