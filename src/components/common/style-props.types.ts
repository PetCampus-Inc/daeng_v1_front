import type { CSSProperties } from "react";

import type { ColorKeys } from "styles/types";

export type SizeType = string | "full" | "fit" | "min" | "max" | "auto";
export type SpaceType = number | string;
export type RadiusType = number | "rectangle" | "circle";

export type LayOutProps = {
  display?: CSSProperties["display"];
  width?: SizeType;
  maxWidth?: SizeType;
  minWidth?: SizeType;
  height?: SizeType;
};

export type SpacingProps = {
  m?: SpaceType;
  margin?: SpaceType;
  mt?: SpaceType;
  marginTop?: SpaceType;
  mr?: SpaceType;
  marginRight?: SpaceType;
  me?: SpaceType;
  marginEnd?: SpaceType;
  mb?: SpaceType;
  marginBottom?: SpaceType;
  ml?: SpaceType;
  marginLeft?: SpaceType;
  ms?: SpaceType;
  marginStart?: SpaceType;
  mx?: SpaceType;
  marginX?: SpaceType;
  marginBlock?: SpaceType;
  my?: SpaceType;
  marginY?: SpaceType;
  marginInline?: SpaceType;
  p?: SpaceType;
  padding?: SpaceType;
  pt?: SpaceType;
  paddingTop?: SpaceType;
  pr?: SpaceType;
  paddingRight?: SpaceType;
  pe?: SpaceType;
  paddingEnd?: SpaceType;
  pb?: SpaceType;
  paddingBottom?: SpaceType;
  pl?: SpaceType;
  paddingLeft?: SpaceType;
  ps?: SpaceType;
  paddingStart?: SpaceType;
  px?: SpaceType;
  paddingX?: SpaceType;
  paddingBlock?: SpaceType;
  py?: SpaceType;
  paddingY?: SpaceType;
  paddingInline?: SpaceType;
};

export type ColorProps = {
  bg?: ColorKeys; // background
  bgColor?: ColorKeys; // background-color
  backgroundColor?: ColorKeys;
  color?: ColorKeys;
};

export type PositionProps = {
  position?: CSSProperties["position"];
  top?: CSSProperties["top"];
  bottom?: CSSProperties["bottom"];
  left?: CSSProperties["left"];
  right?: CSSProperties["right"];
  zIndex?: CSSProperties["zIndex"];
};

export type FlexBoxProps = {
  flex?: number;
  direction?: "row" | "column";
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  gap?: number | string;
  wrap?: CSSProperties["flexWrap"];
  basis?: CSSProperties["flexBasis"];
  grow?: CSSProperties["flexGrow"];
  shrink?: CSSProperties["flexShrink"];
};

export type TextStyleProps = {
  textAlign?: CSSProperties["textAlign"];
  lineHeight?: CSSProperties["lineHeight"];
  letterSpacing?: CSSProperties["letterSpacing"];
  whiteSpace?: CSSProperties["whiteSpace"];
  textOverflow?: CSSProperties["textOverflow"];
  wordBreak?: CSSProperties["wordBreak"];
  textDecoration?: CSSProperties["textDecoration"];
};

export type BorderProps = {
  border?: number; // borderWidth
  borderColor?: ColorKeys;
  borderTop?: number;
  borderRight?: number;
  borderBottom?: number;
  borderLeft?: number;
};

export type RadiusProps = {
  borderRadius?: RadiusType;
  radius?: RadiusType;
};

export type OtherProps = {
  overflow?: CSSProperties["overflow"];
  overflowX?: CSSProperties["overflowX"];
  overflowY?: CSSProperties["overflowY"];
};
