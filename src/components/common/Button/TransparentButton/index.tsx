import type { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from "react";

import ButtonAddon from "./ButtonAddon";
import { StyledButton } from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
  pt?: number;
  pb?: number;
  ph?: number;
  pr?: number;
  pl?: number;
}

const TransparentButton = ({
  children,
  leftAddon,
  rightAddon,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const contentProps = {
    leftAddon,
    rightAddon,
    children
  };

  return (
    <StyledButton>
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

export default TransparentButton;
