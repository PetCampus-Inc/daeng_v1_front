import { Slot, Slottable } from "components/common/Slot";
import { type ElementType, forwardRef, type ReactElement } from "react";

import ButtonAddon from "./ButtonAddon";
import { StyledButton } from "./styles";

import type { ButtonOption } from "./types";
import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../../../styles/system";

export type ButtonProps<C extends ElementType> = PolymorphicComponentPropsWithRef<C, ButtonOption>;

type ButtonComponent = <C extends ElementType = "button">(props: ButtonProps<C>) => ReactElement;

export const Button: ButtonComponent = forwardRef(function Button<C extends ElementType = "button">(
  {
    asChild,
    as: Tag,
    variant = "rectangle",
    colorScheme = "primary",
    typo = "label1_16_B",
    size = "lg",
    width = "auto",
    leftAddon,
    rightAddon,
    children,
    ...rest
  }: ButtonProps<C>,
  ref?: PolymorphicRef<C>
) {
  const Component = asChild ? Slot : Tag;

  return (
    <StyledButton
      as={Component}
      ref={ref}
      variant={variant}
      colorScheme={colorScheme}
      typo={typo}
      size={size}
      width={width}
      {...rest}
    >
      {leftAddon && <ButtonAddon>{leftAddon}</ButtonAddon>}
      <Slottable>{children}</Slottable>
      {rightAddon && <ButtonAddon>{rightAddon}</ButtonAddon>}
    </StyledButton>
  );
}) as ButtonComponent;
