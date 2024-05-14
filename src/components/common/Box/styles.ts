import styled, { css } from "styled-components";
import { remCalc } from "utils/calculator";
import { isNumber } from "utils/typeGuard";

import type { BoxBorderProps, BoxOptions, BoxStyleProps } from "./types";

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

const getWidthSize = ({ width }: Pick<BoxStyleProps, "width">) => {
  switch (width) {
    case "full":
      return "100%";
    case "auto":
      return "auto";
    default:
      return width;
  }
};

const getHeightSize = ({ height }: Pick<BoxStyleProps, "height">) => {
  switch (height) {
    case "full":
      return "100vh";
    case "auto":
      return "auto";
    default:
      return height;
  }
};

export const getPosition = (position: string | number) =>
  isNumber(position) ? remCalc(position) : position;

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
      "textAlign",
      "direction",
      "justify",
      "align",
      "flex"
    ].includes(prop)
})<BoxOptions>`
  display: ${({ display }) => (display ? display : undefined)};
  flex-direction: ${({ direction }) => (direction ? direction : undefined)};
  flex: ${({ flex }) => (flex ? flex : undefined)};
  justify-content: ${({ justify }) => (justify ? justify : undefined)};
  align-items: ${({ align }) => (align ? align : undefined)};

  width: ${({ width }) => (width ? getWidthSize({ width }) : undefined)};
  height: ${({ height }) => (height ? getHeightSize({ height }) : undefined)};
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
  border-top: ${({ borderTop }) => (borderTop ? `${borderTop}px solid` : undefined)};
  border-right: ${({ borderRight }) => (borderRight ? `${borderRight}px solid` : undefined)};
  border-bottom: ${({ borderBottom }) => (borderBottom ? `${borderBottom}px solid` : undefined)};
  border-left: ${({ borderLeft }) => (borderLeft ? `${borderLeft}px solid` : undefined)};
  border-color: ${({ borderColor, theme }) =>
    borderColor ? theme.colors[borderColor] : undefined};
  background-color: ${({ bg, backgroundColor, theme }) =>
    bg ? theme.colors[bg] : backgroundColor ? theme.colors[backgroundColor] : undefined};
  color: ${({ color, theme }) => (color ? theme.colors[color] : undefined)};
  position: ${({ position }) => (position ? position : undefined)};
  top: ${({ top }) => (top ? getPosition(top) : "")};
  bottom: ${({ bottom }) => (bottom ? getPosition(bottom) : "")};
  left: ${({ left }) => (left ? getPosition(left) : "")};
  right: ${({ right }) => (right ? getPosition(right) : "")};
  overflow: ${({ overflow }) => (overflow ? overflow : undefined)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : undefined)};
`;
