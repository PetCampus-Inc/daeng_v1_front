import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  position: fixed;
  padding-top: 40px;
  background-color: ${(props) => props.theme.colors.white};
  justify-content: space-evenly;
`;
