import styled from "styled-components";

import type { BadgeProps } from "./index";
import type { DefaultTheme } from "styled-components";

const badgeStyles = (theme: DefaultTheme) => ({
  brown: `background-color: ${theme.colors.br_4}; color: ${theme.colors.primaryColor};`,
  yellow: `background-color: ${theme.colors.yellow_3}; color: ${theme.colors.primaryColor};`,
  gray: `background-color: ${theme.colors.gray_5}; color: ${theme.colors.gray_2};`,
  // neutralized: `background-color: ${theme.colors.yellow_3}; color: ${theme.colors.primaryColor};`,
  orange: `background-color: #fff2e8; color: ${theme.colors.primary_3};`,
  lightBrown: `background-color: ${theme.colors.br_5}; color: ${theme.colors.primaryColor};`
});

export const Badge = styled.span.withConfig({
  shouldForwardProp: (prop) => !["variant"].includes(prop)
})<{
  variant: BadgeProps["variant"];
}>`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

  min-width: 50px;
  border-radius: 50px;
  padding: 2px 10px;

  ${({ theme }) => theme.typo.caption1_12_R}

  ${({ variant, theme }) => badgeStyles(theme)[variant]};

  user-select: none;
  padding: 2px 8px;
`;
