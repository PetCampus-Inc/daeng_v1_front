import { Box, Flex } from "components/common";
import { Title } from "components/Enrollment/styles";
import { ReactNode } from "react";

interface ITitleWithIcon {
  title: string;
  icon?: ReactNode;
  handleClick?: () => void;
  children?: ReactNode;
}

const TitleWithIcon = ({ title, icon, handleClick, children }: ITitleWithIcon) => {
  return (
    <Box display="flex" align="center" justify="space-between" mb={12} width="full">
      {children}
      <Title>{title}</Title>
      <Flex align={"center"} gap={4} onClick={handleClick}>
        {icon}
      </Flex>
    </Box>
  );
};

export default TitleWithIcon;
