import { css, styled } from "styled-components";
import { remCalc } from "utils/calculator";
import { isNumber } from "utils/typeGuard";

import type { LayoutProps } from ".";
import type { LayoutType, TPaddingOptions } from "./types";

export const getPadding = ({ pt, pb, pl, pr, type }: TPaddingOptions & LayoutType) => {
  if (type === "page") {
    return css`
      padding-top: ${pt ? `calc(5vh + ${remCalc(pt)})` : "calc(5vh)"};
      padding-bottom: ${pb ? `calc(7vh + ${remCalc(pb)})` : "0"};
      padding-left: ${pl ? remCalc(pl) : "1rem"};
      padding-right: ${pr ? remCalc(pr) : "1rem"};
    `;
  } else {
    return css`
      padding-top: ${pt ? (isNumber(pt) ? remCalc(pt) : pt) : ""};
      padding-bottom: ${pb ? (isNumber(pb) ? remCalc(pb) : pb) : ""};
      padding-left: ${pl ? (isNumber(pl) ? remCalc(pl) : pl) : ""};
      padding-right: ${pr ? (isNumber(pr) ? remCalc(pr) : pr) : ""};
    `;
  }
};

export const StyledContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "type",
      "position",
      "pt",
      "pb",
      "pr",
      "pl",
      "paddingInline",
      "paddingBlock",
      "bg",
      "backgroundColor"
    ].includes(prop)
})<LayoutProps>`
  position: ${({ position }) => position ?? position};

  padding: ${({ padding }) => padding ?? padding};

  ${({ type, pt, pb, pl, pr }) => getPadding({ type, pt, pb, pl, pr })};

  padding-inline: ${({ paddingInline }) => (paddingInline ? remCalc(paddingInline) : undefined)};
  padding-block: ${({ paddingBlock }) => (paddingBlock ? remCalc(paddingBlock) : undefined)};

  background-color: ${({ bg, backgroundColor, theme }) =>
    bg ? theme.colors[bg] : backgroundColor ? theme.colors[backgroundColor] : theme.colors.white};

  width: 100vw;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;
