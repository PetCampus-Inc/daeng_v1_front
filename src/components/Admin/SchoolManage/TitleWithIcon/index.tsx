import { ReactNode } from "react";
import { IconWrapper } from "components/Admin/DogInfo/styles";
import { Title } from "components/MembershipApplication/styles";
import { StyledTextWrapper } from "components/SignIn/InputBoxAndText/styles";

interface ITitleWithIcon {
  title: string;
  icon: ReactNode;
}

const TitleWithIcon = ({ title, icon }: ITitleWithIcon) => {
  return (
    <StyledTextWrapper>
      <Title>{title}</Title>
      <IconWrapper>{icon}</IconWrapper>
    </StyledTextWrapper>
  );
};

export default TitleWithIcon;
