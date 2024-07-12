import { type ForwardedRef, forwardRef, type HTMLAttributes } from "react";

import { StyledFlex } from "./styles";

import type { FlexBoxProps, LayOutProps, OtherProps, SpacingProps } from "../style-props.types";

export type FlexOptions = FlexBoxProps & LayOutProps & SpacingProps & OtherProps;

type FlexProps = FlexOptions & HTMLAttributes<HTMLDivElement>;

export const Flex = forwardRef(function Flex(
  { children, ...props }: FlexProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledFlex ref={ref} {...props}>
      {children}
    </StyledFlex>
  );
});
