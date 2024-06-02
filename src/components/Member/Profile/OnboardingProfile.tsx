import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";
import useFocus from "hooks/common/useFocus";

import NickNameEdite from "./NickNameEdite";
import ProfileEditeBox from "./ProfileEditeBox";
import RoleEdite from "./RoleEdite";

const OnboardingProfile = () => {
  const { isFocusing, handleFocus, handleBlur } = useFocus();

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
        <ProfileEditeBox />
      </Flex>
      <Flex direction="column" gap="4">
        <Text as="span" typo="body2_16_R" color="gray_1">
          닉네임
        </Text>
        <Flex align="center" gap="2">
          <NickNameEdite handleFocus={handleFocus} handleBlur={handleBlur} />의
          <RoleEdite />
        </Flex>
      </Flex>
    </>
  );
};

export default OnboardingProfile;
