import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavList = styled.ul.withConfig({
  displayName: "Nav",
  shouldForwardProp: (prop) => !["radius"].includes(prop)
})<{ radius?: string }>`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: ${({ theme }) => theme.breakPoints.md};
  height: 78px;

  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => (props.radius ? props.radius : "")};
  box-shadow: ${({ theme }) => theme.shadows.bottomTab};

  z-index: 5;
`;

export const NavItem = styled.li`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavLink = styled(Link).withConfig({
  displayName: "Nav",
  shouldForwardProp: (prop) => !["padding"].includes(prop)
})<{ pb: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  padding: ${(props) => `8px 0 ${props.pb + "px"}`};
`;

export const SvgIcon = styled.span.withConfig({
  displayName: "SvgIcon"
})<{ size: number }>`
  display: flex;
  align-items: inherit;
  justify-content: inherit;

  & > svg {
    width: ${(props) => props.size + "px"};
    width: ${(props) => props.size + "px"};
    vertical-align: top;
  }
`;

export const Text = styled.span`
  line-height: 150% !important;
  color: ${(props) => props.theme.colors.gray_3};
  ${({ theme }) => theme.typo.caption1_12_R};

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
  bottom: 11px;
  z-index: -1;
`;
