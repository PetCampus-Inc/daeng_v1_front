import { IconWrapper } from "components/Admin/DogDetailInfo/DogInfo/styles";
import { Box } from "components/common";
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
      <IconWrapper onClick={handleClick}>{icon}</IconWrapper>
    </Box>
  );
};

export default TitleWithIcon;
