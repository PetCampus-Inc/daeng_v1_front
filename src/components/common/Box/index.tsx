import type { ElementType } from "react";

import { type CSSProperties, type ForwardedRef, forwardRef, type HTMLAttributes } from "react";

import { StyledBox } from "./styles";

import type { TColor } from "styles/ThemeConfig";

export type BoxOptions = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  margin?: CSSProperties["margin"];
  mr?: number | string;
  mt?: number | string;
  ml?: number | string;
  mb?: number | string;
  padding?: CSSProperties["padding"];
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
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
