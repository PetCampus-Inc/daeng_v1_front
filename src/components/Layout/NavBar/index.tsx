import React from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";

// **경로 수정 필요** //
const Navbar = () => {
  return (
    <Container>
      <ul>
        <li>
          <Link to={"/"}>
            <div>홈</div>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <div>알림장</div>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <div>유치원</div>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <div>견주마이</div>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default Navbar;
