import styled from "styled-components";

import { getFlexStyle, getMarginStyle, getPaddingStyle, getSizeStyle } from "../style-modules";

import type { FlexOptions } from ".";

export const StyledFlex = styled.div.withConfig({
  displayName: "Flex",
  shouldForwardProp: (prop) =>
    ![
      "gap",
      "width",
      "height",
      "maxWidth",
      "maxHeight",
      "overflowX",
      "overflowY",
      "display",
      "direction",
      "align",
      "justify",
      "wrap",
      "basis",
      "grow",
      "shrink",
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
      "paddingInline"
    ].includes(prop)
})<FlexOptions>`
  ${(props) => getSizeStyle(props)};
  ${(props) => getFlexStyle(props)};
  ${(props) => getMarginStyle(props)};
  ${(props) => getPaddingStyle(props)};

  overflow-x: ${(props) => props.overflowX || undefined};
  overflow-y: ${(props) => props.overflowY || undefined};
`;
