import { forwardRef, type ElementType } from "react";

import { StyledBox } from "./styles";

import type { BoxOptions } from "./types";
import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../polymorphic";

export type BoxProps<C extends ElementType = "div"> = PolymorphicComponentPropsWithRef<
  C,
  BoxOptions
>;

export const Box = forwardRef(function Box<C extends ElementType = "div">(
  props: BoxProps<C>,
  ref?: PolymorphicRef<C>
) {
  const { as, children, ...rest } = props;

  return (
    <StyledBox ref={ref} as={as} color={"inherit"} {...rest}>
      {children}
    </StyledBox>
  );
});
