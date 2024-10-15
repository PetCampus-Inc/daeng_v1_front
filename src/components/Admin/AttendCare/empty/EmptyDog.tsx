import { routes } from "constants/path";

import RightArrow from "assets/svg/arrow-right-icon";
import DogFilledIcon from "assets/svg/dog-filled-icon";
import { Flex, Box, Text } from "components/common";
import { Link } from "react-router-dom";

import { LinkText } from "../card/styles";

const EmptyDog = () => {
  return (
    <>
      <Box pb={6}>
        <DogFilledIcon w={40} h={40} rx={8} aria-hidden="true" />
      </Box>
      <Flex direction="column" gap={2}>
        <LinkText>
          <Link to={routes.admin.attendance.root}>
            출석 진행 하기 <RightArrow w={"20"} h={"20"} aria-hidden="true" />
          </Link>
        </LinkText>
        <Text typo="label2_14_R" color="gray_2">
          출석 후에 관리할 강아지를 선택할 수 있어요
        </Text>
      </Flex>
    </>
  );
};

export default EmptyDog;
