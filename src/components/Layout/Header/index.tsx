import React from "react";
import { Container, HeaderWrapper, IconsWrapper, LogoWrapper } from "./styles";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Container>
      <HeaderWrapper>
        <LogoWrapper to={"/home"}>
          <img src="images/knock-dog-logo.png" alt="logo" />
          <img src="images/yellow-dot.png" alt="yellow-dot" />
        </LogoWrapper>
        <IconsWrapper>
          <Link to={"/"}>
            <img src="images/foot-icon.png" alt="logo" />
          </Link>
          <Link to={"/"}>
            <img src="images/bell-icon.png" alt="yellow-dot" />
          </Link>
        </IconsWrapper>
      </HeaderWrapper>
    </Container>
  );
};

export default Header;
