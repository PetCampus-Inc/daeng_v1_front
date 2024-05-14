import styled, { type DefaultTheme, css } from "styled-components";

import type { ICustomStyle, TColorScheme, TPaddingOptions } from "./types";

const colorSchemeStyles = (theme: DefaultTheme) => ({
  primary: css`
    background: ${theme.colors.br_4};
    color: ${theme.colors.primaryColor};
  `,
  gray: css`
    background: ${theme.colors.gray_4};
    color: ${theme.colors.gray_2};
  `
});

type ButtonProps = {
  colorScheme: TColorScheme;
} & TPaddingOptions &
  ICustomStyle;

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !["p", "pt", "pb", "ph", "pr", "pl", "colorScheme", "customStyle"].includes(prop)
})<ButtonProps>`
  display: flex;
  padding-top: ${({ p, pt }) => p ?? pt ?? 0.125}rem;
  padding-bottom: ${({ p, pb }) => p ?? pb ?? 0.125}rem;
  padding-left: ${({ p, pl, ph }) => `${p ?? pl ?? ph ?? 0.75}rem`};
  padding-right: ${({ p, pr, ph }) => `${p ?? pr ?? ph ?? 0.75}rem`};
  align-items: center;
  gap: 10px;

  ${({ theme }) => theme.typo.label2_14_M};
  border-radius: 8px;

  ${({ theme, colorScheme, customStyle }) => {
    const scheme = colorSchemeStyles(theme)[colorScheme as keyof typeof colorSchemeStyles];
    return customStyle ? customStyle : scheme;
  }};
`;

export const StyledButtonAddon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
