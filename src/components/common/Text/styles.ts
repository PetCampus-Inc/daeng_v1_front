import styled, { CSSProperties, css } from "styled-components";

import { TColor, TTypo } from "../../../styles/ThemeConfig";

export interface IStyledTextProps {
  color?: TColor;
  typo: TTypo;
  isEllipsis?: boolean;
  textAlign?: CSSProperties["textAlign"];
}

export type StyledEmEmProps = {
  color?: TColor;
};

export const StyledText = styled.span.withConfig({
  shouldForwardProp: (prop) => !["color", "typo", "isEllipsis", "textAlign"].includes(prop)
})<IStyledTextProps>`
  color: ${({ color, theme }) => (color && theme.colors[color]) || "inherit"};
  ${({ theme, typo }) => theme.typo[typo]};
  text-align: ${({ textAlign }) => textAlign || ""};
  ${({ isEllipsis }) =>
    isEllipsis &&
    css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `};
`;

export const StyledEm = styled.em.withConfig({
  shouldForwardProp: (prop) => !["color"].includes(prop)
})<StyledEmEmProps>`
  color: ${({ theme, color }) => (color && theme.colors[color]) || "inherit"};
`;
