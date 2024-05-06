import { type ForwardedRef, type HTMLAttributes, type ReactNode, forwardRef } from "react";

import { type IStyledTextProps, StyledText } from "./styles";

export type TextProps = {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement> &
  IStyledTextProps;

export const Text = forwardRef(function Text(
  {
    as = "span",
    children,
    typo = "body2_16_R",
    color = "black",
    isEllipsis = false,
    ...props
  }: TextProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <StyledText ref={ref} as={as} color={color} typo={typo} isEllipsis={isEllipsis} {...props}>
      {children}
    </StyledText>
  );
});
