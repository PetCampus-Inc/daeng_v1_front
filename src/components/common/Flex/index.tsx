import { type CSSProperties, type ForwardedRef, forwardRef, type HTMLAttributes } from "react";

import { StyledFlex } from "./styles";

import type { BoxStyleProps, SizeType, SpacingProps } from "../Box/types";

type FlexWidthSet = {
  width?: SizeType;
  maxWidth?: SizeType;
  minWidth?: SizeType;
  height?: SizeType;
  maxHeight?: SizeType;
};

export type FlexOptions = BoxStyleProps &
  SpacingProps &
  FlexWidthSet & {
    gap?: CSSProperties["gap"];
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
