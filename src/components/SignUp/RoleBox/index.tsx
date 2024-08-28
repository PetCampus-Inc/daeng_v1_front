import DogCircleIcon from "assets/svg/dog-circle-icon";
import DogGlassesCircleIcon from "assets/svg/dog-glasses-circle-icon";
import { Box, Flex, Text } from "components/common";
import { memo } from "react";
import { AdminRole } from "types/common/role.types";

import { StyledMainWrapper } from "./styles";

interface Props {
  role: AdminRole;
  mainText: string;
  subText: string;
  selected: boolean;
  handleClick: () => void;
}

const RoleBox = ({ role, mainText, subText, selected, handleClick }: Props) => {
  return (
    <StyledMainWrapper selected={selected} onClick={handleClick}>
      <Box mb={16}>
        {role === AdminRole.ROLE_TEACHER ? (
          selected ? (
            <DogCircleIcon colorScheme="primary" w={80} h={80} />
          ) : (
            <DogCircleIcon colorScheme="yellow" w={80} h={80} />
          )
        ) : selected ? (
          <DogGlassesCircleIcon colorScheme="primary" w={80} h={80} />
        ) : (
          <DogGlassesCircleIcon colorScheme="yellow" w={80} h={80} />
        )}
      </Box>

      <Flex direction="column" align="center" gap={4}>
        <Text typo="title2_20_B" color="darkBlack">
          {mainText}
        </Text>
        <Text typo="label2_14_R" color="gray_2" textAlign="center" whiteSpace="pre-wrap">
          {subText}
        </Text>
      </Flex>
    </StyledMainWrapper>
  );
};
export default memo(RoleBox);
