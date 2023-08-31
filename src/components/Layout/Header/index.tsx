import React from "react";
import { Container, HeaderWrapper, IconsWrapper, LogoWrapper } from "./styles";
import { Link } from "react-router-dom";
import { memo } from "react";

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
            <img src="images/foot-icon.png" alt="foot-icon" />
          </Link>
          <Link to={"/"}>
            <img src="images/bell-icon.png" alt="bell-icon" />
          </Link>
        </IconsWrapper>
      </HeaderWrapper>
    </Container>
  );
};

export default memo(Header);
