import { ACCEPT_FILE_TYPE, TYPE_NAME } from "constants/s3File";

import AddCIcon from "assets/svg/add-c-icon";
import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";
import { ChangeEvent, useRef } from "react";
import { useFormContext } from "react-hook-form";

import ProfileActiveBox from "../Box/ProfileActiveBox";
import * as S from "../styles";

interface ProfileCreateProps {
  isActive?: boolean;
  setIsActive?: (isActive: boolean) => void;
  profile: IFile[];
  fileInputRef?: React.LegacyRef<HTMLInputElement> | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
  registerText: string;
  type: string;
}

const ProfileCreate = ({
  isActive,
  setIsActive,
  profile,
  fileInputRef,
  handleFileChange,
  registerText,
  type
}: ProfileCreateProps) => {
  const divRef = useRef<HTMLButtonElement>(null);
  const { register } = useFormContext();

  const handleClickTarget = () => {
    divRef?.current?.focus();
  };

  const handleActive = () => {
    isActive && setIsActive?.(false);
  };

  return (
    <Flex align="center" direction="column" justify="center" gap="12" width="100%">
      <S.ProfileBox>
        <S.UploadProfileButton
          id={type}
          onClick={handleClickTarget}
          onBlur={() => setIsActive?.(true)}
          ref={divRef}
          aria-label="uploadProfileButton"
        >
          {profile.length > 0 ? (
            <>
              <S.UploadImage
                onClick={handleActive}
                src={profile[0].thumbnail}
                alt={`${type}-profile`}
              />
              {!isActive && <ProfileActiveBox htmlFor={registerText} />}
            </>
          ) : (
            <>
              <S.ProfileLabel htmlFor={registerText} />
              <AddCIcon />
            </>
          )}
        </S.UploadProfileButton>
      </S.ProfileBox>

      <S.StyledHiddenUpload
        {...register(registerText, {
          required: true,
          onChange: (e) => handleFileChange(e, type)
        })}
        ref={fileInputRef && fileInputRef}
        id={registerText}
        type="file"
        accept={ACCEPT_FILE_TYPE.IMAGE}
      />
      <Text as="span" typo="body2_16_R" color="gray_2">
        {type === TYPE_NAME.MEMBER ? "내 프로필" : "강아지 프로필"}
      </Text>
    </Flex>
  );
};

export default ProfileCreate;
