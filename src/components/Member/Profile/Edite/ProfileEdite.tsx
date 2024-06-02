import AddCIcon from "assets/svg/add-c-icon";
import { IFile } from "components/Admin/AttendCare/AttendCareGallery/upload";
import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import ProfileActiveBox from "../Box/ProfileActiveBox";
import * as S from "../styles";

interface IProfileEdite {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  handleClick: (type: string) => void;
  profile: IFile[];
  fileInputRef: React.LegacyRef<HTMLInputElement> | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>, type: string) => void;
  registerText: string;
  type: string;
}

const ProfileEdite = ({
  isActive,
  setIsActive,
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
      <S.UploadProfileButton onClick={() => handleClick(type)} onBlur={() => setIsActive(true)}>
        {profile.length > 0 ? (
          <>
            <S.UploadImage src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
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
        multiple
        accept={"image/*"}
        onChange={(e) => handleFileChange(e, type)}
      />
      <Text as="span" typo="body2_16_R" color="gray_2">
        {type === "MY" ? "내 프로필" : "강아지 프로필"}
      </Text>
    </Flex>
  );
};

export default ProfileEdite;
