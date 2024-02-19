import { motion } from "framer-motion";
import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  width: 120px;
`;

export const Button = styled(motion.button)`
  min-width: 55px;
  padding: 4px 16px;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.br_2};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.caption1_12_B};

  &.second {
    background-color: ${({ theme }) => theme.colors.br_4};
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;
