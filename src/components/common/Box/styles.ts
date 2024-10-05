import styled from "styled-components";

import {
  getBorderStyle,
  getColorStyle,
  getDisplayStyle,
  getFlexStyle,
  getMarginStyle,
  getPaddingStyle,
  getPositionStyle,
  getSizeStyle
} from "../../../styles/system";

import type { BoxOptions } from ".";

export const StyledBox = styled.div.withConfig({
  displayName: "Box",
  shouldForwardProp: (prop) =>
    ![
      "display",
      "w",
      "width",
      "h",
      "height",
      "maxWidth",
      "minWidth",
      "maxHeight",
      "minHeight",
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
      "zIndex",
      "whiteSpace",
      "textWrap",
      "typo",
      "shadow"
    ].includes(prop)
})<BoxOptions>`
  ${(props) => getDisplayStyle(props)};
  ${(props) => getSizeStyle(props)};
  ${(props) => {
    const { display, ...flexProps } = props;
    return getFlexStyle(flexProps);
  }}
  ${(props) => getMarginStyle(props)};
  ${(props) => getPaddingStyle(props)};
  ${(props) => getBorderStyle(props)};
  ${(props) => getColorStyle(props)};
  ${(props) => getPositionStyle(props)};

  white-space: ${(props) => props.whiteSpace};
  text-wrap: ${(props) => props.textWrap};
  box-shadow: ${({ shadow, theme }) => shadow && theme.shadows[shadow]};
  overflow: ${(props) => props.overflow};
  text-align: ${(props) => props.textAlign};
  ${({ theme, typo }) => typo && theme.typo[typo]};
`;
