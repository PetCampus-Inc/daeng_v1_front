import type { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from "react";

import ButtonAddon from "./ButtonAddon";
import { StyledButton } from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
  colorScheme?: TColorScheme;
  pt?: number;
  pb?: number;
  ph?: number;
  pr?: number;
  pl?: number;
}

export type TColorScheme = "primary" | "gray";

const SimpleButton = ({
  children,
  leftAddon,
  rightAddon,
  colorScheme = "primary",
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const contentProps = {
    leftAddon,
    rightAddon,
    children
  };

  return (
    <StyledButton colorScheme={colorScheme} {...props}>
      <ButtonContent {...contentProps} />
    </StyledButton>
  );
};

type ButtonContentProps = Pick<ButtonProps, "leftAddon" | "rightAddon" | "children">;

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

export default SimpleButton;
