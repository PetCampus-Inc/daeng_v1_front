import { type CSSProperties, type ForwardedRef, forwardRef, type HTMLAttributes } from "react";

import { StyledFlex } from "./styles";

export type FlexOptions = {
  gap?: CSSProperties["gap"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  maxWidth?: CSSProperties["maxWidth"];
  maxHeight?: CSSProperties["maxHeight"];
  overflowX?: CSSProperties["overflowX"];
  overflowY?: CSSProperties["overflowY"];
  margin?: CSSProperties["margin"];
  padding?: CSSProperties["padding"];
  display?: CSSProperties["display"];
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
  { children, display, direction, align, justify, wrap, basis, grow, shrink, ...props }: FlexProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <StyledFlex
      ref={ref}
      display={display}
      direction={direction}
      align={align}
      justify={justify}
      wrap={wrap}
      basis={basis}
      grow={grow}
      shrink={shrink}
      {...props}
    >
      {children}
    </StyledFlex>
  );
});
