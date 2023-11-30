import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div<{ display?: string }>`
  position: fixed;
  bottom: 0;
  height: 10vh;
  width: 100%;
  background-color: ${(props) => props.theme.white};
  display: ${(props) => (props.display ? props.display : "flex")};
  justify-content: center;
  align-items: center;
`;

export const StyledNavBtn = styled(Link)<{
  selected?: boolean;
  type?: string;
}>`
  width: ${(props) => (props.type === "admin" ? "33%" : "25%")};
  height: 100%;
  font-size: medium;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) =>
    props.selected ? props.theme.red_1 : props.theme.white};
`;

export const StyledImage = styled.img<{
  src: string;
  alt: string;
}>``;
