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
  shouldForwardProp: (prop) => !["colorScheme"].includes(prop)
})<{ colorScheme: TColorScheme }>`
  display: flex;
  padding: 1px 12px;
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
