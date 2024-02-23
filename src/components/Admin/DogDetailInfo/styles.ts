import { motion } from "framer-motion";
import styled from "styled-components";

export const NavWrapper = styled.ul`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-around;
  margin: 0 20px;
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
  background-color: ${({ theme }) => theme.colors.white};
  height: 2px;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  height: 100%;
  width: 100%;
  padding: 24px 16px 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
