import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 10vh;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledNavBtn = styled(Link)<{ selected?: boolean }>`
  width: 25%;
  height: 100%;
  font-size: medium;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? "red" : "white")};
`;
