import { CSSProperties } from "react";

import type { ColorKeys } from "styles/types";

export type SizeType = string | "full" | "fit" | "min" | "max" | "auto";

export type BoxStyleProps = {
  display?: CSSProperties["display"];
  width?: SizeType;
  maxWidth?: SizeType;
  minWidth?: SizeType;
  height?: SizeType;
};

export type SpacingProps = {
  margin?: CSSProperties["margin"];
  marginRight?: CSSProperties["marginRight"];
  marginLeft?: CSSProperties["marginLeft"];
  marginTop?: CSSProperties["marginTop"];
  marginBottom?: CSSProperties["marginBottom"];
  marginBlock?: number | string; // margin-block
  marginInline?: number | string; // margin-inline
  mr?: number | string; // margin right
  ml?: number | string; // margin left
  mt?: number | string; // margin top
  mb?: number | string; // margin bottom
  padding?: CSSProperties["padding"];
  paddingTop?: CSSProperties["paddingTop"];
  paddingRight?: CSSProperties["paddingRight"];
  paddingBottom?: CSSProperties["paddingBottom"];
  paddingLeft?: CSSProperties["paddingLeft"];
  paddingInline?: number | string; // padding-inline
  paddingBlock?: number | string; // padding-block
  pt?: number | string; // padding top
  pr?: number | string; // padding right
  pb?: number | string; // padding bottom
  pl?: number | string; // padding left
};

type BoxColorProps = {
  bg?: ColorKeys;
  backgroundColor?: ColorKeys;
  color?: ColorKeys;
};

type BoxPositionProps = {
  position?: CSSProperties["position"];
  bottom?: CSSProperties["bottom"];
  top?: CSSProperties["top"];
  left?: CSSProperties["left"];
  right?: CSSProperties["right"];

  overflow?: CSSProperties["overflow"];
  textAlign?: "center" | "start" | "end" | "left" | "right";
  zIndex?: CSSProperties["zIndex"];
};

type BoxFlexBoxProps = {
  flex?: number;
  direction?: "row" | "column";
  justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
  align?: "center" | "flex-start" | "flex-end" | "stretch";
  gap?: number;
};

export type BoxBorderProps = {
  border?: number;
  borderRadius?: number | "rectangle" | "circle";
  borderColor?: ColorKeys;
  borderTop?: number;
  borderRight?: number;
  borderBottom?: number;
  borderLeft?: number;
};

export type BoxOptions = BoxStyleProps &
  SpacingProps &
  BoxColorProps &
  BoxPositionProps &
  BoxBorderProps &
  BoxFlexBoxProps;
