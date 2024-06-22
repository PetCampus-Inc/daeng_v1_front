import styled from "styled-components";
import { remCalc } from "utils/calculator";

import type { FlexOptions } from ".";
import type { SizeType } from "../Box/types";

const getSize = (size: SizeType) => {
  switch (size) {
    case "full":
      return "100%";
    case "fit":
      return "fit-content";
    case "min":
      return "min-content";
    case "max":
      return "max-content";
    case "auto":
      return "auto";
    default:
      return size;
  }
};

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
      "pl"
    ].includes(prop)
})<FlexOptions>`
  width: ${({ width }) => (width ? getSize(width) : undefined)};
  max-width: ${({ maxWidth }) => (maxWidth ? getSize(maxWidth) : undefined)};
  min-width: ${({ minWidth }) => (minWidth ? getSize(minWidth) : undefined)};
  height: ${({ height }) => (height ? getSize(height) : undefined)};
  max-height: ${({ maxHeight }) => (maxHeight ? getSize(maxHeight) : undefined)};
  overflow-x: ${(props) => props.overflowX || undefined};
  overflow-y: ${(props) => props.overflowY || undefined};

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

  display: ${(props) => props.display || "flex"};
  gap: ${(props) => (props.gap ? props.gap + "px" : undefined)};
  flex-direction: ${(props) => props.direction || undefined};
  align-items: ${(props) => props.align || undefined};
  justify-content: ${(props) => props.justify || undefined};
  flex-wrap: ${(props) => props.wrap || undefined};
  flex-basis: ${(props) => props.basis || undefined};
  flex-grow: ${(props) => props.grow || undefined};
  flex-shrink: ${(props) => props.shrink || undefined};
`;
