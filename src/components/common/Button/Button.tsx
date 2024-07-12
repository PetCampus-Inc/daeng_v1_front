import { type ElementType, forwardRef, ForwardRefExoticComponent, RefAttributes } from "react";

import ButtonAddon from "./ButtonAddon";
import { StyledButton } from "./styles";
import { type ButtonProps } from "./types";
import { PolymorphicComponentPropsWithRef, type PolymorphicRef } from "../polymorphic";

type ButtonType = ForwardRefExoticComponent<
  PolymorphicComponentPropsWithRef<ElementType, ButtonProps<ElementType>> &
    RefAttributes<ElementType>
>;

export const Button: ButtonType = forwardRef(function Button<C extends ElementType = "button">(
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
});

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
