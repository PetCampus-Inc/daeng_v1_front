import React from "react";
import { Container, StyledNavBtn } from "./styles";
import { Link } from "react-router-dom";

// **경로 수정 필요** //
const Navbar = () => {
  return (
    <Container>
      <StyledNavBtn to={"/"}>홈</StyledNavBtn>
      <StyledNavBtn to={"/"}>알림장</StyledNavBtn>
      <StyledNavBtn to={"/"}>유치원</StyledNavBtn>
      <StyledNavBtn to={"/"}>견주마이</StyledNavBtn>
    </Container>
  );
};

export default Navbar;
