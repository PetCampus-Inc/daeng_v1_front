import { CSSProperties } from "react";
import { TColor } from "styles/ThemeConfig";

export type BoxStyleProps = {
  display?: CSSProperties["display"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
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
  bg?: TColor;
  backgroundColor?: TColor;
  color?: TColor;
};

type BoxPositionProps = {
  position?: CSSProperties["position"];
  overflow?: CSSProperties["overflow"];
  align?: "center" | "start" | "end" | "left" | "right";
};

export type BoxBorderProps = {
  border?: number;
  borderRadius?: number | "rectangle" | "circle";
  borderColor?: TColor;
  borderTop?: number;
  borderRight?: number;
  borderBottom?: number;
  borderLeft?: number;
};

export type BoxOptions = BoxStyleProps &
  SpacingProps &
  BoxColorProps &
  BoxPositionProps &
  BoxBorderProps;