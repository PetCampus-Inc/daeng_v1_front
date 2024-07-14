import { css, styled } from "styled-components";
import { themeConfig } from "styles/themeConfig";
import { remCalc } from "utils/calculator";

import { getColorStyle } from "../style-modules";

import type { LayoutProps } from ".";

export const StyledContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["type", "bg", "bgColor", "backgroundColor", "paddingX", "px"].includes(prop)
})<LayoutProps>`
  ${(props) => getColorStyle(props) ?? `background-color: ${props.theme.colors.white}`};

  position: relative;
  overflow: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  padding-inline: ${({ paddingX, px }) =>
    paddingX !== undefined ? remCalc(paddingX) : px !== undefined ? remCalc(px) : undefined};

  ${({ type }) =>
    type === "global" &&
    css`
      min-width: ${themeConfig.breakPoints.mobile};
      max-width: ${themeConfig.breakPoints.tablet};
      min-height: 100%;
      margin: 0 auto;
    `}

  ${({ type }) =>
    type === "page" &&
    css`
      width: 100%;
      height: 100%;
      min-height: calc(100vh - 78px - 48px);
    `}
`;
