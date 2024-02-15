import styled, { DefaultTheme } from "styled-components";
import { ButtonBadgeProps } from ".";
import { motion } from "framer-motion";

const badgeStyles = (theme: DefaultTheme) => ({
  delete: `background-color: ${theme.colors.yellow_3}; color: ${theme.colors.primaryColor};`,
  cancel: `background-color: ${theme.colors.gray_4}; color: ${theme.colors.gray_2};`
});

export const Badge = styled(motion.button)<{
  type: ButtonBadgeProps["type"];
}>`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

  border-radius: 8px;

  ${({ theme }) => theme.typo.label2_14_M}

  ${({ type, theme }) => badgeStyles(theme)[type]};

  padding: 2px 12px;

  transition:
    background-color 0.3s,
    color 0.3s;
`;
