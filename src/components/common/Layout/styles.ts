import { css, styled } from "styled-components";
import { getColorStyle, getPaddingStyle } from "styles/system";

import type { LayoutProps } from ".";

export const StyledContainer = styled.div.withConfig({
  displayName: "Layout",
  shouldForwardProp: (prop) =>
    ![
      "type",
      "bg",
      "bgColor",
      "backgroundColor",
      "paddingX",
      "px",
      "paddingTop",
      "pt",
      "paddingBlock",
      "paddingY",
      "py",
      "paddingBottom",
      "pb"
    ].includes(prop)
})<LayoutProps>`
  ${(props) => getColorStyle(props) ?? `background-color: ${props.theme.colors.white}`};

  position: relative;
  overflow: auto;
  width: 100%;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${(props) => getPaddingStyle(props)};

  ${({ type }) =>
    type === "main" &&
    css`
      height: calc(100% - 78px - 48px);
    `}

  ${({ type }) =>
    type === "detail" &&
    css`
      height: calc(100% - 48px);
    `}

      ${({ type }) =>
    type === "page" &&
    css`
      height: 100%;
    `}
`;
