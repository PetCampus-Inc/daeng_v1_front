import type { ElementType } from "react";

import { CSSProperties, ForwardedRef, forwardRef, HTMLAttributes } from "react";

import { StyledBox } from "./styles";

export type BoxOptions = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  margin?: CSSProperties["margin"];
  mr?: CSSProperties["marginRight"];
  mt?: CSSProperties["marginTop"];
  ml?: CSSProperties["marginLeft"];
  mb?: CSSProperties["marginBottom"];
  padding?: CSSProperties["padding"];
  pt?: CSSProperties["paddingTop"];
  pr?: CSSProperties["paddingRight"];
  pb?: CSSProperties["paddingBottom"];
  pl?: CSSProperties["paddingLeft"];
  border?: CSSProperties["border"];
  borderRadius?: CSSProperties["borderRadius"];
  borderColor?: CSSProperties["borderColor"];
  borderTop?: CSSProperties["borderTop"];
  borderRight?: CSSProperties["borderRight"];
  borderBottom?: CSSProperties["borderBottom"];
  borderLeft?: CSSProperties["borderLeft"];
  bg?: CSSProperties["backgroundColor"];
  color?: CSSProperties["color"];
  position?: CSSProperties["position"];
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
