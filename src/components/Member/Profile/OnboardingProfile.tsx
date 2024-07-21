import { FILE_URI_NAME, PROFILE_NAME } from "constants/profile";

import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";
import useFocus from "hooks/common/useFocus";
import { useRef, useState } from "react";

import ProfileUploadBox from "./Box/ProfileUploadBox";
import NickNameEdit from "./Edit/NickNameEdit";
import RoleEdit from "./Edit/RoleEdit";

const OnboardingProfile = () => {
  const { handleFocus, handleBlur } = useFocus();
  const [isMyActive, setMyIsActive] = useState(false);
  const [isDogActive, setDogIsActive] = useState(false);
  const myFileInputRef = useRef<HTMLInputElement>(null);
  const dogFileInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Flex direction="column" marginBottom="14">
        <Text as="h3" typo="title2_20_B" color="gray_1">
          프로필을 만들어주세요
        </Text>
        <Text as="span" typo="body2_16_R" color="gray_2">
          내 프로필과 강아지 프로필 사진을 등록하고
        </Text>
        <Text as="span" typo="body2_16_R" color="gray_2">
          닉네임을 입력해 주세요
        </Text>
      </Flex>
      <Flex gap="20" marginBottom="14">
        <ProfileUploadBox
          type={PROFILE_NAME.MEMBER}
          isActive={isMyActive}
          setIsActive={setMyIsActive}
          fileRef={myFileInputRef}
          fileName={FILE_URI_NAME.MEMBER}
          mode="create"
        />
        <ProfileUploadBox
          type={PROFILE_NAME.DOG}
          isActive={isDogActive}
          setIsActive={setDogIsActive}
          fileRef={dogFileInputRef}
          fileName={FILE_URI_NAME.DOG}
          mode="create"
        />
      </Flex>
      <Flex direction="column" gap="4">
        <Text as="span" typo="body2_16_R" color="gray_1">
          닉네임
        </Text>
        <Flex align="center" gap="2">
          <NickNameEdit handleFocus={handleFocus} handleBlur={handleBlur} />의
          <RoleEdit />
        </Flex>
      </Flex>
    </>
  );
};

export default OnboardingProfile;
