import type { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from "react";

import ButtonAddon from "./ButtonAddon";
import { StyledButton } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
}

const SimpleButton = ({
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
    <StyledButton {...props}>
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
