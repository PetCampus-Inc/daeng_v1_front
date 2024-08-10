import { type ForwardedRef, forwardRef, type HTMLAttributes } from "react";

import { StyledFlex } from "./styles";

import type { FlexBoxProps, SizeProps, OtherProps, SpacingProps } from "../../../styles/system";

export type FlexOptions = FlexBoxProps & SizeProps & SpacingProps & OtherProps;

type FlexProps = FlexOptions & HTMLAttributes<HTMLDivElement>;

export const Flex = forwardRef(function Flex(
  { children, display = "flex", ...props }: FlexProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledFlex {...props} ref={ref} display={display}>
      {children}
    </StyledFlex>
  );
});
