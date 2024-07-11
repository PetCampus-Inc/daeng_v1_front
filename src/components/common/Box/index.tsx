import { forwardRef, type ReactElement, type ElementType } from "react";

import { StyledBox } from "./styles";

import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../polymorphic";
import type {
  BorderProps,
  ColorProps,
  FlexBoxProps,
  LayOutProps,
  OtherProps,
  PositionProps,
  RadiusProps,
  SpacingProps,
  TextStyleProps
} from "../style-props.types";

export type BoxOptions = LayOutProps &
  SpacingProps &
  ColorProps &
  PositionProps &
  FlexBoxProps &
  TextStyleProps &
  BorderProps &
  RadiusProps &
  OtherProps;

type BoxProps<C extends ElementType> = PolymorphicComponentPropsWithRef<C, BoxOptions>;

type BoxComponent = <C extends ElementType = "div">(props: BoxProps<C>) => ReactElement;

export const Box: BoxComponent = forwardRef(function Box<C extends ElementType = "div">(
  { as, children, ...props }: BoxProps<C>,
  ref?: PolymorphicRef<C>
) {
  const Component = as || "div";
  return (
    <StyledBox as={Component} {...props} ref={ref}>
      {children}
    </StyledBox>
  );
}) as BoxComponent;
