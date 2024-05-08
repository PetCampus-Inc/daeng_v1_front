import FootIcon from "assets/svg/foot-icon";
import styled from "styled-components";

export const Nav = styled.nav`
  width: 100vw;
  background-color: white;
  padding: 5rem 0 0.5rem 0;
`;

export const NavWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  white-space: nowrap;
`;

export const NavItem = styled.li`
  width: 30%;
  border-right: 1px solid ${({ theme }) => theme.colors.gray_5};
  color: ${({ theme }) => theme.colors.gray_4};
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typo.body2_16_B};
  &.selected {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
  &.last {
    border-right: none;
  }
`;

export const FootIconItem = styled(FootIcon)`
  &.selected {
    width: 1rem;
    height: 1rem;
    margin-right: 5px;
    path {
      fill: ${({ theme }) => theme.colors.br_3};
    }
  }
`;
