import { IconWrapper } from "components/Admin/DogDetailInfo/DogInfo/styles";
import { Title } from "components/MembershipApplication/styles";
import { StyledTextWrapper } from "components/SignIn/InputBoxAndText/styles";
import { ReactNode } from "react";

interface ITitleWithIcon {
  title: string;
  icon?: ReactNode;
  handleClick?: () => void;
  children?: ReactNode;
}

const TitleWithIcon = ({ title, icon, handleClick, children }: ITitleWithIcon) => {
  return (
    <StyledTextWrapper style={{ margin: "0 0 12px", width: "100%" }}>
      {children}
      <Title>{title}</Title>
      <IconWrapper onClick={handleClick}>{icon}</IconWrapper>
    </StyledTextWrapper>
  );
};

export default TitleWithIcon;
