import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface MotionTabProps {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  width: 100%;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.br_5};
  color: ${({ theme }) => theme.colors.br_2};
  margin: 2rem 0;
  padding: 0.3rem 0.4rem;
`;

export const Tab = styled.div`
  text-align: center;
  width: 100%;
  border-radius: 90px;
  ${({ theme }) => theme.typo.body2_16_R};
`;

export const MotionTab = styled(motion.div)<MotionTabProps>`
  width: 100%;
  border-radius: 90px;
  padding: 0.375rem 2.625rem;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};
  ${({ selected, theme }) =>
    selected
      ? css`
          background-color: ${theme.colors.primaryColor};
          color: ${theme.colors.white};
          ${theme.typo.body2_16_B};
        `
      : css`
          background-color: ${theme.colors.br_5};
          color: ${theme.colors.br_2};
          ${theme.typo.body2_16_R};
        `};
`;
