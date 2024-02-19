import { motion } from "framer-motion";
import styled from "styled-components";

export const NavWrapper = styled.ul`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  position: relative;
`;

export const NavItem = styled.li`
  position: relative;
  color: ${({ theme }) => theme.colors.br_3};
  user-select: none;
  ${({ theme }) => theme.typo.body1_18_B};
  &.selected {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const Underline = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: white;
  height: 2px;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;
