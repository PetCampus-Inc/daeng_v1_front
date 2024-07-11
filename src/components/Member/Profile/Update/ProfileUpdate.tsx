import { ACCEPT_FILE_TYPE, PROFILE_NAME } from "constants/profile";

import AddCIcon from "assets/svg/add-c-icon";
import PencilBrownNormalIcon from "assets/svg/pencil-brown-normal-icon";
import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { Flex } from "components/common/Flex";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import * as S from "../styles";

interface IProfileEdite {
  handleClick: (type: string) => void;
  profile: IFile[];
  fileInputRef: React.LegacyRef<HTMLInputElement> | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
  registerText: string;
  type: string;
}

const ProfileUpdate = ({
  handleClick,
  profile,
  fileInputRef,
  handleFileChange,
  registerText,
  type
}: IProfileEdite) => {
  const { register } = useFormContext();

  return (
    <Flex align="center" direction="column" justify="center" gap="12" width="100%">
      <S.ProfileBox onClick={() => handleClick(type)}>
        <S.UploadProfileButton w="107" h="107" br="40">
          <S.UploadImage src={profile[0]?.thumbnail} alt={`${type}-profile`} />
        </S.UploadProfileButton>
        <S.PencilIconBox>
          <PencilBrownNormalIcon />
        </S.PencilIconBox>
      </S.ProfileBox>

      <S.StyledHiddenUpload
        {...register(registerText)}
        type="file"
        ref={fileInputRef}
        accept={ACCEPT_FILE_TYPE.IMAGE}
        onChange={(e) => handleFileChange(e, type)}
      />
    </Flex>
  );
};

export default ProfileUpdate;
