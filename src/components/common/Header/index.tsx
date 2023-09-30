import {
  Container,
  HeaderWrapper,
  IconsWrapper,
  LogoWrapper,
  BackIconWrapper,
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
              <img src="images/knock-dog-logo.png" alt="logo" />
              <img src="images/yellow-dot.png" alt="yellow-dot" />
            </LogoWrapper>
            <IconsWrapper>
              <Link to={"/"}>
                <img src="images/foot-icon.png" alt="foot-icon" />
              </Link>
              <Link to={"/"}>
                <img src="images/bell-icon.png" alt="bell-icon" />
              </Link>
            </IconsWrapper>
          </>
        )}
        {type === "back" && (
          <BackIconWrapper onClick={handleClick}>
            <img src="images/chevron-left.png" alt="logo" />
          </BackIconWrapper>
        )}
      </HeaderWrapper>
    </Container>
  );
};

export default memo(Header);
