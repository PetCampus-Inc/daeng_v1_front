import { forwardRef, type ReactElement, type ElementType } from "react";

import { StyledBox } from "./styles";

import type {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
  WrapProps
} from "../../../styles/system";
import type {
  DisplayProps,
  BorderProps,
  ColorProps,
  FlexBoxProps,
  SizeProps,
  OtherProps,
  PositionProps,
  RadiusProps,
  SpacingProps,
  TextStyleProps
} from "../../../styles/system";

export type BoxOptions = DisplayProps &
  DisplayProps &
  SizeProps &
  SpacingProps &
  ColorProps &
  PositionProps &
  Omit<FlexBoxProps, "display"> &
  TextStyleProps &
  BorderProps &
  RadiusProps &
  WrapProps &
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
