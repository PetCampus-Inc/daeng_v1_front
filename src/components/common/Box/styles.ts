import styled, { css } from "styled-components";
import { remCalc } from "utils/calculator";

import type { BoxBorderProps, BoxOptions } from "./types";

const getBorderRadiusStyle = ({ borderRadius }: Pick<BoxBorderProps, "borderRadius">) => {
  switch (borderRadius) {
    case "rectangle":
      return css`
        border-radius: 8px;
      `;
    case "circle":
      return css`
        border-radius: 50%;
      `;
    default:
      return css`
        border-radius: ${borderRadius ? `${borderRadius}px` : undefined};
      `;
  }
};

export const StyledBox = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "display",
      "width",
      "height",
      "margin",
      "marginBlock",
      "marginInline",
      "mr",
      "mt",
      "ml",
      "mb",
      "marginRight",
      "marginTop",
      "marginLeft",
      "marginBottom",
      "padding",
      "paddingBlock",
      "paddingInline",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "pt",
      "pr",
      "pb",
      "pl",
      "border",
      "borderRadius",
      "borderColor",
      "borderTop",
      "borderRight",
      "borderBottom",
      "borderLeft",
      "bg",
      "backgroundColor",
      "color",
      "position",
      "top",
      "bottom",
      "left",
      "right",
      "overflow",
      "textAlign"
    ].includes(prop)
})<BoxOptions>`
  display: ${({ display }) => (display ? display : undefined)};
  width: ${({ width }) => (width ? width : undefined)};
  height: ${({ height }) => (height ? height : undefined)};
  margin: ${({ margin }) => (margin ? margin : undefined)};
  margin-right: ${({ mr, marginRight }) =>
    mr ? remCalc(mr) : marginRight ? remCalc(marginRight) : undefined};
  margin-top: ${({ mt, marginTop }) =>
    mt ? remCalc(mt) : marginTop ? remCalc(marginTop) : undefined};
  margin-left: ${({ ml, marginLeft }) =>
    ml ? remCalc(ml) : marginLeft ? remCalc(marginLeft) : undefined};
  margin-bottom: ${({ mb, marginBottom }) =>
    mb ? remCalc(mb) : marginBottom ? remCalc(marginBottom) : undefined};
  margin-inline: ${({ marginInline }) => (marginInline ? remCalc(marginInline) : undefined)};
  margin-block: ${({ marginBlock }) => (marginBlock ? remCalc(marginBlock) : undefined)};
  padding: ${({ padding }) => (padding ? padding : undefined)};
  padding-top: ${({ pt, paddingTop }) =>
    pt ? remCalc(pt) : paddingTop ? remCalc(paddingTop) : undefined};
  padding-right: ${({ pr, paddingRight }) =>
    pr ? remCalc(pr) : paddingRight ? remCalc(paddingRight) : undefined};
  padding-bottom: ${({ pb, paddingBottom }) =>
    pb ? remCalc(pb) : paddingBottom ? remCalc(paddingBottom) : undefined};
  padding-left: ${({ pl, paddingLeft }) =>
    pl ? remCalc(pl) : paddingLeft ? remCalc(paddingLeft) : undefined};
  padding-inline: ${({ paddingInline }) => (paddingInline ? remCalc(paddingInline) : undefined)};
  padding-block: ${({ paddingBlock }) => (paddingBlock ? remCalc(paddingBlock) : undefined)};
  border: ${({ border }) => (border ? `${border}px solid` : undefined)};
  ${getBorderRadiusStyle};
  border-color: ${({ borderColor, theme }) =>
    borderColor ? theme.colors[borderColor] : undefined};
  border-top: ${({ borderTop }) => (borderTop ? `${borderTop}px` : undefined)};
  border-right: ${({ borderRight }) => (borderRight ? `${borderRight}px` : undefined)};
  border-bottom: ${({ borderBottom }) => (borderBottom ? `${borderBottom}px` : undefined)};
  border-left: ${({ borderLeft }) => (borderLeft ? `${borderLeft}px` : undefined)};
  background-color: ${({ bg, backgroundColor, theme }) =>
    bg ? theme.colors[bg] : backgroundColor ? theme.colors[backgroundColor] : undefined};
  color: ${({ color, theme }) => (color ? theme.colors[color] : undefined)};
  position: ${({ position }) => (position ? position : undefined)};
  top: ${({ top }) => top ?? undefined};
  bottom: ${({ bottom }) => bottom ?? undefined};
  left: ${({ left }) => left ?? undefined};
  right: ${({ right }) => right ?? undefined};
  overflow: ${({ overflow }) => (overflow ? overflow : undefined)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : undefined)};
`;
