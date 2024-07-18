import { ACCEPT_FILE_TYPE, PROFILE_NAME } from "constants/profile";

import AddCIcon from "assets/svg/add-c-icon";
import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import ProfileActiveBox from "../Box/ProfileActiveBox";
import * as S from "../styles";

interface ProfileCreateProps {
  isActive: boolean;
  setIsActive?: (isActive: boolean) => void;
  handleClick: (type: string) => void;
  profile: IFile[];
  fileInputRef: React.LegacyRef<HTMLInputElement> | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
  registerText: string;
  type: string;
}

const ProfileCreate = ({
  isActive,
  setIsActive,
  handleClick,
  profile,
  fileInputRef,
  handleFileChange,
  registerText,
  type
}: ProfileCreateProps) => {
  const { register } = useFormContext();
  return (
    <Flex align="center" direction="column" justify="center" gap="12" width="100%">
      <S.UploadProfileButton
        onClick={() => handleClick(type)}
        onBlur={() => setIsActive && setIsActive(true)}
      >
        {profile.length > 0 ? (
          <>
            <S.UploadImage src={profile[0].thumbnail} alt={`${type}-profile`} />
            {!isActive && <ProfileActiveBox />}
          </>
        ) : (
          <AddCIcon />
        )}
      </S.UploadProfileButton>
      <S.StyledHiddenUpload
        {...register(registerText)}
        type="file"
        ref={fileInputRef}
        accept={ACCEPT_FILE_TYPE.IMAGE}
        onChange={(e) => handleFileChange(e, type)}
      />
      <Text as="span" typo="body2_16_R" color="gray_2">
        {type === PROFILE_NAME.MEMBER ? "내 프로필" : "강아지 프로필"}
      </Text>
    </Flex>
  );
};

export default ProfileCreate;
