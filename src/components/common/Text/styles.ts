import styled, { css } from "styled-components";

import { TColor, TTypo } from "../../../styles/ThemeConfig";

export interface IStyledTextProps {
  color: TColor;
  typo: TTypo;
  isEllipsis?: boolean;
}

export const StyledText = styled.span.withConfig({
  shouldForwardProp: (prop) => !["color", "typo", "isEllipsis", "accent"].includes(prop)
})<IStyledTextProps>`
  color: ${({ color, theme }) => color && theme.colors[color]};
  ${({ theme, typo }) => theme.typo[typo]};
  ${({ isEllipsis }) =>
    isEllipsis &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `};
`;

export type StyledEmEmProps = {
  color?: TColor;
};

export const StyledEm = styled.em.withConfig({
  shouldForwardProp: (prop) => !["color"].includes(prop)
})<StyledEmEmProps>`
  color: ${({ theme, color }) => (color && theme.colors[color]) || "inherit"};
`;
