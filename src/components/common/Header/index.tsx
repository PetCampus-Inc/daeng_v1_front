import {
  Container,
  HeaderWrapper,
  IconsWrapper,
  LogoWrapper,
  BackIconWrapper,
  TitleText,
  TextWrapper,
  StyledImage,
} from "./styles";
import { Link } from "react-router-dom";
import { memo } from "react";

/*
header type
- main : 로고
- back : 뒤로기기
*/

interface Props {
  type: string;
  handleClick?: () => void | Promise<void>;
  text?: string;
}

const Header = ({ type, handleClick, text }: Props) => {
  return (
    <Container>
      <HeaderWrapper type={type}>
        {type === "main" && (
          <>
            <LogoWrapper to={"/home"}>
              <StyledImage src="/images/knock-dog-logo.png" alt="logo" />
              <StyledImage src="/images/yellow-dot.png" alt="yellow-dot" />
            </LogoWrapper>
            <IconsWrapper>
              <Link to={"/"}>
                <StyledImage src="/images/foot-icon.png" alt="foot-icon" />
              </Link>
              <Link to={"/"}>
                <StyledImage src="/images/bell-icon.png" alt="bell-icon" />
              </Link>
            </IconsWrapper>
          </>
        )}
        {type === "back" && (
          <BackIconWrapper onClick={handleClick}>
            <StyledImage src="/images/chevron-left.png" alt="chevron-left" />
          </BackIconWrapper>
        )}
        {type === "text" && (
          <TextWrapper>
            <BackIconWrapper onClick={handleClick}>
              <StyledImage src="/images/chevron-left.png" alt="chevron-left" />
            </BackIconWrapper>
            <TitleText>{text}</TitleText>
            <div style={{ width: "5%" }} />
          </TextWrapper>
        )}
      </HeaderWrapper>
    </Container>
  );
};

export default memo(Header);
