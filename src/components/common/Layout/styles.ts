import { css, styled } from "styled-components";

import { themeConfig } from "styles/themeConfig";

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

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${(props) => getPaddingStyle(props)};

  ${({ type }) =>
    type === "global" &&
    css`
      max-width: ${themeConfig.breakPoints.md};
      min-height: 100%;
      margin: 0 auto;
    `}

  ${({ type }) =>
    type === "main" &&
    css`
      width: 100%;
      height: calc(100vh - 78px - 48px);
      min-height: 100%;
    `}


  ${({ type }) =>
    type === "detail" &&
    css`
      width: 100%;
      height: calc(100vh - 48px);
      min-height: 100%;
    `}
`;
