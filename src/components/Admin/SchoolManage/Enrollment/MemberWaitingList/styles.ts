import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Text = styled.p`
  margin-top: 45%;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.body2_16_R};
`;

export const CardContainer = styled(motion.div)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

export const UpperWrapper = styled.div`
  padding: 14px 12px 12px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

export const LinkToEnrollment = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primaryColor};
  ${({ theme }) => theme.typo.label2_14_R};

  > svg {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  gap: 4px;
`;
