import {
  type ForwardedRef,
  type HTMLAttributes,
  type ReactNode,
  forwardRef,
  Children,
  isValidElement
} from "react";

import { type IStyledTextProps, StyledText, type StyledEmEmProps, StyledEm } from "./styles";

export type TextProps = {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement> &
  IStyledTextProps &
  StyledEmEmProps;

export const Text = forwardRef(function Text(
  { as = "span", children, typo, color, isEllipsis, ...props }: TextProps,
  ref: ForwardedRef<HTMLSpanElement>
) {
  const styledChildren = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === "em") {
      // StyledEm 컴포넌트로 자동으로 감싸고, 각 em 요소의 props를 존중하면서 색상 적용
      const color = child.props.color;
      return <StyledEm color={color}>{child.props.children}</StyledEm>;
    }
    return child;
  });

  return (
    <StyledText ref={ref} as={as} color={color} typo={typo} isEllipsis={isEllipsis} {...props}>
      {styledChildren}
    </StyledText>
  );
});

Text.defaultProps = {
  as: "span",
  typo: "body2_16_R",
  isEllipsis: false
};
