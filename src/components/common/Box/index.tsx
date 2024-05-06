import type { ElementType } from "react";

import { type ForwardedRef, forwardRef, type HTMLAttributes } from "react";

import { StyledBox } from "./styles";

import type { BoxOptions } from "./types";

export type BoxProps = BoxOptions &
  HTMLAttributes<HTMLDivElement> & {
    as?: ElementType;
  };

export const Box = forwardRef(function Box(
  { as = "div", children, ...props }: BoxProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledBox ref={ref} as={as} {...props}>
      {children}
    </StyledBox>
  );
});
