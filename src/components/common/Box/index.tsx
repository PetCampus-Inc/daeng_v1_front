import type { ElementType } from "react";

import { type CSSProperties, type ForwardedRef, forwardRef, type HTMLAttributes } from "react";

import { StyledBox } from "./styles";

import type { TColor } from "styles/ThemeConfig";

export type BoxOptions = {
  display?: CSSProperties["display"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  margin?: CSSProperties["margin"];
  mr?: number | string; // margin right
  ml?: number | string; // margin left
  mt?: number | string; // margin top
  mb?: number | string; // margin bottom
  marginBlock?: number | string; // margin-block
  marginInline?: number | string; // margin-inline
  padding?: CSSProperties["padding"];
  pt?: number | string; // padding-top
  pr?: number | string; // padding-right
  pb?: number | string; // padding-bottom
  pl?: number | string; // padding-left
  paddingInline?: number | string; // padding-inline
  paddingBlock?: number | string; // padding-block
  border?: number;
  borderRadius?: number;
  borderColor?: TColor;
  borderTop?: number;
  borderRight?: number;
  borderBottom?: number;
  borderLeft?: number;
  bg?: TColor;
  color?: TColor;
  position?: CSSProperties["position"];
  overflow?: CSSProperties["overflow"];
};

export type BoxProps = BoxOptions &
  HTMLAttributes<HTMLDivElement> & {
    tag?: ElementType;
  };

export const Box = forwardRef(function Box(
  { tag = "div", children, ...props }: BoxProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledBox ref={ref} as={tag} {...props}>
      {children}
    </StyledBox>
  );
});
