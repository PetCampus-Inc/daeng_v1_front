import styled, { type DefaultTheme, css } from "styled-components";

import type { TColorScheme } from ".";

const colorSchemeStyles = (theme: DefaultTheme) => ({
  primary: css`
    background-color: ${theme.colors.br_4};
    color: ${theme.colors.primaryColor};
  `,
  gray: css`
    background-color: ${theme.colors.gray_4};
    color: ${theme.colors.gray_2};
  `
});

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["pt", "pb", "ph", "pr", "pl", "colorScheme"].includes(prop)
})<{
  pt?: number;
  pb?: number;
  ph?: number;
  pr?: number;
  pl?: number;
  colorScheme: TColorScheme;
}>`
  display: flex;
  padding-top: ${({ pt }) => (pt ? pt : 0.125)}rem;
  padding-bottom: ${({ pb }) => (pb ? pb : 0.125)}rem;
  padding-left: ${({ pl, ph }) => (pl ? pl : ph ? ph : 0.75)}rem;
  padding-right: ${({ pr, ph }) => (pr ? pr : ph ? ph : 0.75)}rem;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  ${({ theme }) => theme.typo.label2_14_M};

  ${({ theme, colorScheme }) => colorSchemeStyles(theme)[colorScheme]};
`;

export const StyledButtonAddon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
