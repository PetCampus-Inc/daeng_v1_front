import PrincipalIcon from "assets/svg/principal-icon";
import PrincipalSelectedIcon from "assets/svg/principal-selected-icon";
import TeacherIcon from "assets/svg/teacher-icon";
import TeacherSelectedIcon from "assets/svg/teacher-selected-icon";
import { Box, Flex, Text } from "components/common";
import { AdminRole } from "pages/AdminSignUp/AdminSignUpFunnel";
import { memo } from "react";

import { StyledMainWrapper } from "./styles";

interface Props {
  role: "TEACHER" | "OWNER";
  mainText: string;
  subText: string;
  selected: boolean;
  handleClick: () => void;
}

const RoleBox = ({ role, mainText, subText, selected, handleClick }: Props) => {
  return (
    <StyledMainWrapper selected={selected} onClick={handleClick}>
      <Box mb={16}>
        {role === AdminRole.TEACHER ? (
          selected ? (
            <TeacherSelectedIcon />
          ) : (
            <TeacherIcon />
          )
        ) : selected ? (
          <PrincipalSelectedIcon />
        ) : (
          <PrincipalIcon />
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
