import { BoxOptions } from "components/common";
import styled from "styled-components";
import { remCalc } from "utils/calculator";

export const StyledBox = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "display",
      "width",
      "height",
      "margin",
      "mr",
      "mt",
      "ml",
      "mb",
      "padding",
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
      "color",
      "position",
      "overflow"
    ].includes(prop)
})<BoxOptions>`
  display: ${({ display }) => (display ? display : undefined)};
  width: ${({ width }) => (width ? width : undefined)};
  height: ${({ height }) => (height ? height : undefined)};
  margin: ${({ margin }) => (margin ? margin : undefined)};
  margin-right: ${({ mr }) => (mr ? remCalc(mr) : undefined)};
  margin-top: ${({ mt }) => (mt ? remCalc(mt) : undefined)};
  margin-left: ${({ ml }) => (ml ? remCalc(ml) : undefined)};
  margin-bottom: ${({ mb }) => (mb ? remCalc(mb) : undefined)};
  padding: ${({ padding }) => (padding ? padding : undefined)};
  padding-top: ${({ pt }) => (pt ? remCalc(pt) : undefined)};
  padding-right: ${({ pr }) => (pr ? remCalc(pr) : undefined)};
  padding-bottom: ${({ pb }) => (pb ? remCalc(pb) : undefined)};
  padding-left: ${({ pl }) => (pl ? remCalc(pl) : undefined)};
  border: ${({ border }) => (border ? `${border}px solid` : undefined)};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : undefined)};
  border-color: ${({ borderColor, theme }) =>
    borderColor ? theme.colors[borderColor] : undefined};
  border-top: ${({ borderTop }) => (borderTop ? `${borderTop}px` : undefined)};
  border-right: ${({ borderRight }) => (borderRight ? `${borderRight}px` : undefined)};
  border-bottom: ${({ borderBottom }) => (borderBottom ? `${borderBottom}px` : undefined)};
  border-left: ${({ borderLeft }) => (borderLeft ? `${borderLeft}px` : undefined)};
  background-color: ${({ bg, theme }) => (bg ? theme.colors[bg] : undefined)};
  color: ${({ color, theme }) => (color ? theme.colors[color] : undefined)};
  position: ${({ position }) => (position ? `${position}` : undefined)};
  overflow: ${({ overflow }) => (overflow ? `${overflow}` : undefined)};
`;
