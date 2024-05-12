import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div<{ radius?: string }>`
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
  border-radius: ${(props) => (props.radius ? props.radius : "")};
  box-shadow: ${({ theme }) => theme.shadows.bottomTab};
  z-index: 5;
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

export const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 20%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};
  top: -15px;
  z-index: -1;
`;
