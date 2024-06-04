import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";

import ProfileEditeBox from "./Box/ProfileEditeBox";

const AddDogProfile = () => {
  return (
    <>
      <Flex direction="column" marginBottom="14">
        <Text as="h3" typo="title2_20_B" color="gray_1">
          강아지 프로필을 추가해 주세요
        </Text>
        <Text as="span" typo="body2_16_R" color="gray_2">
          강아지 프로필 사진을 등록해야 홈 이용이 가능합니다
        </Text>
      </Flex>
      <Flex gap="20" marginBottom="14">
        <ProfileEditeBox isOnlyProfile="DOG" />
      </Flex>
    </>
  );
};

export default AddDogProfile;
