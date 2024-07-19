import { type ElementType, forwardRef, type ReactElement } from "react";

import ButtonAddon from "./ButtonAddon";
import { StyledButton } from "./styles";

import type { ButtonOption } from "./types";
import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../polymorphic";

export type ButtonProps<C extends ElementType> = PolymorphicComponentPropsWithRef<C, ButtonOption>;

type ButtonComponent = <C extends ElementType = "button">(props: ButtonProps<C>) => ReactElement;

export const Button: ButtonComponent = forwardRef(function Button<C extends ElementType = "button">(
  {
    as,
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
  const contentProps = {
    leftAddon,
    rightAddon,
    children
  };

  return (
    <StyledButton
      as={as || "button"}
      ref={ref}
      variant={variant}
      colorScheme={colorScheme}
      typo={typo}
      size={size}
      width={width}
      {...rest}
    >
      <ButtonContent {...contentProps} />
    </StyledButton>
  );
}) as ButtonComponent;

type ButtonContentProps = Pick<ButtonProps<ElementType>, "leftAddon" | "rightAddon" | "children">;

const ButtonContent = (props: ButtonContentProps) => {
  const { leftAddon, rightAddon, children } = props;

  return (
    <>
      {leftAddon && <ButtonAddon>{leftAddon}</ButtonAddon>}
      {children}
      {rightAddon && <ButtonAddon>{rightAddon}</ButtonAddon>}
    </>
  );
};
