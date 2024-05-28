import type { ButtonHTMLAttributes, PropsWithChildren, ReactElement } from "react";

import ButtonAddon from "./ButtonAddon";
import { StyledButton } from "./styles";

import type { ICustomStyle, TColorScheme, TPaddingOptions } from "./types";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ICustomStyle,
    TPaddingOptions {
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
  colorScheme?: TColorScheme;
}

const SimpleButton = ({
  children,
  leftAddon,
  rightAddon,
  colorScheme = "primary",
  css,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const contentProps = {
    leftAddon,
    rightAddon,
    children
  };

  return (
    <StyledButton colorScheme={colorScheme} css={css} {...props}>
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
