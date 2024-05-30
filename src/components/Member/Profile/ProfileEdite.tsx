import AddCIcon from "assets/svg/add-c-icon";
import { Flex } from "components/common/Flex";
import { Text } from "components/common/Text";

import * as S from "./styles";

const ProfileEdite = () => {
  return (
    <>
      <Flex align="center" direction="column" justify="center" gap="12" width="100%">
        <S.UploadProfileButton align="center" justify="center">
          <AddCIcon />
        </S.UploadProfileButton>
        <Text as="span" typo="body2_16_R" color="gray_2">
          내 프로필
        </Text>
      </Flex>
      <Flex align="center" direction="column" justify="center" gap="12" width="100%">
        <S.UploadProfileButton align="center" justify="center">
          <AddCIcon />
        </S.UploadProfileButton>
        <Text as="span" typo="body2_16_R" color="gray_2">
          강아지 프로필
        </Text>
      </Flex>
    </>
  );
};

export default ProfileEdite;
