import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 78px;
  height: 7vh;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 15px;
`;

export const NavButton = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
`;

export const Text = styled.span`
  color: ${(props) => props.theme.colors.gray_3};
  ${({ theme }) => theme.typo.caption1_12_R}

  &.active {
    color: ${(props) => props.theme.colors.primaryColor};
    ${({ theme }) => theme.typo.caption1_12_B}
  }
`;
