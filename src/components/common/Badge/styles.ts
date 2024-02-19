import styled from "styled-components";
import type { DefaultTheme } from "styled-components";
import type { BadgeProps } from "./index";

const badgeStyles = (theme: DefaultTheme) => ({
  required: `background-color: ${theme.colors.yellow_3}; color: ${theme.colors.primaryColor};`,
  adminRequired: `background-color: ${theme.colors.yellow_3}; color: ${theme.colors.primaryColor};`,
  optional: `background-color: ${theme.colors.gray_5}; color: ${theme.colors.gray_2};`,
  neutralized: `background-color: ${theme.colors.yellow_3}; color: ${theme.colors.primaryColor};`,
  vaccinated: `background-color: #fff2e8; color: ${theme.colors.primary_3};`,
  pickdrop: `background-color: ${theme.colors.br_5}; color: ${theme.colors.primaryColor};`
});

export const Badge = styled.span<{
  type: BadgeProps["type"];
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

  ${({ type, theme }) => badgeStyles(theme)[type]};

  user-select: none;
  padding: 2px 8px;
`;
