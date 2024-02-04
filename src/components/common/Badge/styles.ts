import styled from "styled-components";
import type { DefaultTheme } from "styled-components";
import type { BadgeProps } from "./index";

const badgeStyles = (theme: DefaultTheme) => ({
  required: `background-color: ${theme.br_4}; color: ${theme.primaryColor};`,
  optional: `background-color: ${theme.gray_5}; color: ${theme.gray_2};`
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

  ${({ theme }) => theme.typo.caption1_12_R}

  ${({ type, theme }) => badgeStyles(theme)[type]};

  user-select: none;
  padding: 2px 8px;
`;
