import { type CSSProperties, type ForwardedRef, forwardRef, type HTMLAttributes } from "react";

import { StyledFlex } from "./styles";

import type { BoxStyleProps, SpacingProps } from "../Box/types";

export type FlexOptions = BoxStyleProps &
  SpacingProps & {
    gap?: CSSProperties["gap"];
    maxWidth?: CSSProperties["maxWidth"];
    maxHeight?: CSSProperties["maxHeight"];
    overflowX?: CSSProperties["overflowX"];
    overflowY?: CSSProperties["overflowY"];
    direction?: CSSProperties["flexDirection"];
    align?: CSSProperties["alignItems"];
    justify?: CSSProperties["justifyContent"];
    wrap?: CSSProperties["flexWrap"];
    basis?: CSSProperties["flexBasis"];
    grow?: CSSProperties["flexGrow"];
    shrink?: CSSProperties["flexShrink"];
  };

export type FlexProps = FlexOptions & HTMLAttributes<HTMLDivElement>;

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
