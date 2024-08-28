import styled from "styled-components";

import type { BadgeProps } from "./index";
import type { DefaultTheme } from "styled-components";
import type { TypoKeys } from "styles/types";

const badgeStyles = (theme: DefaultTheme) => ({
  brown: `background-color: ${theme.colors.br_4}; color: ${theme.colors.primaryColor};`,
  yellow: `background-color: ${theme.colors.yellow_3}; color: ${theme.colors.primaryColor};`,
  gray: `background-color: ${theme.colors.gray_5}; color: ${theme.colors.gray_2};`,
  orange: `background-color: #fff2e8; color: ${theme.colors.primary_3};`,
  lightBrown: `background-color: ${theme.colors.br_5}; color: ${theme.colors.primaryColor};`
});

export const Badge = styled.span.withConfig({
  shouldForwardProp: (prop) => !["variant", "typo"].includes(prop)
})<{
  variant: BadgeProps["variant"];
  typo?: TypoKeys;
}>`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;

  min-width: 50px;
  border-radius: 50px;
  padding: 2px 10px;

  ${({ theme, typo }) => (typo ? theme.typo[typo] : theme.typo.caption1_12_R)};

  ${({ variant, theme }) => badgeStyles(theme)[variant]};

  user-select: none;
  padding: 2px 8px;
`;
