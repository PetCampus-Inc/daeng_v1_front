import styled from "styled-components";
import { remCalc } from "utils/calculator";

import type { TColor } from "styles/ThemeConfig";

export const Background = styled.div.withConfig({
  shouldForwardProp: (prop) => !["bg", "pb"].includes(prop)
})<{ bg: TColor; pb: number }>`
  background-color: ${({ theme, bg }) => theme.colors[bg]};
  padding: 16px 16px ${({ pb }) => remCalc(pb)};
`;

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !["bg"].includes(prop)
})<{ bg: TColor }>`
  position: relative;
  width: 100%;
  min-height: 48px;
  height: 2rem;
  border-radius: 8px;
  background-color: ${(props) =>
    props.bg ? ({ theme, bg }) => theme.colors[bg] : ({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.gray_3};
  ${({ theme }) => theme.typo.label1_16_B};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray_4};
    color: ${({ theme }) => theme.colors.gray_3};
  }

  transition:
    background-color 0.3s,
    color 0.3s;
`;

export const BackgroundButtonWrapper = styled.div<{ hasNav?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: ${({ hasNav }) => (hasNav ? "calc(7vh)" : 0)};
`;
