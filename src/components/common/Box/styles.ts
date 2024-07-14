import styled from "styled-components";

import {
  getBorderStyle,
  getColorStyle,
  getFlexStyle,
  getMarginStyle,
  getPaddingStyle,
  getPositionStyle,
  getSizeStyle
} from "../style-modules";

import type { BoxOptions } from ".";

export const StyledBox = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "display",
      "width",
      "height",
      "maxWidth",
      "minWidth",
      "m",
      "margin",
      "mt",
      "marginTop",
      "mr",
      "marginRight",
      "me",
      "marginEnd",
      "mb",
      "marginBottom",
      "ml",
      "marginLeft",
      "ms",
      "marginStart",
      "mx",
      "marginX",
      "my",
      "marginY",
      "p",
      "padding",
      "pt",
      "paddingTop",
      "pr",
      "paddingRight",
      "pe",
      "paddingEnd",
      "pb",
      "paddingBottom",
      "pl",
      "paddingLeft",
      "ps",
      "paddingStart",
      "px",
      "paddingX",
      "py",
      "paddingY",
      "marginBlock",
      "marginInline",
      "paddingBlock",
      "paddingInline",
      "border",
      "borderColor",
      "borderTop",
      "borderRight",
      "borderBottom",
      "borderLeft",
      "borderRadius",
      "radius",
      "bg",
      "bgColor",
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
      "flex",
      "gap",
      "zIndex"
    ].includes(prop)
})<BoxOptions>`
  ${(props) => getSizeStyle(props)};
  ${(props) => getFlexStyle(props)};
  ${(props) => getMarginStyle(props)};
  ${(props) => getPaddingStyle(props)};
  ${(props) => getBorderStyle(props)};
  ${(props) => getColorStyle(props)};
  ${(props) => getPositionStyle(props)};

  overflow: ${(props) => props.overflow};
  text-align: ${(props) => props.textAlign};
`;
