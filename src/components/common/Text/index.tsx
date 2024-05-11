import { forwardRef, Children, isValidElement, ElementType } from "react";

import { type IStyledTextProps, StyledText, type StyledEmEmProps, StyledEm } from "./styles";

import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "../polymorphic";

export type TextProps<C extends ElementType = "span"> = PolymorphicComponentPropsWithRef<
  C,
  IStyledTextProps & StyledEmEmProps
>;

export const Text = forwardRef(function Text<C extends ElementType = "span">(
  props: TextProps<C>,
  ref?: PolymorphicRef<C>
) {
  const { as, color, typo, isEllipsis, children, ...rest } = props;

  const styledChildren = Children.map(children, (child) => {
    if (isValidElement(child) && child.type === "em") {
      const color = child.props.color;
      return <StyledEm color={color}>{child.props.children}</StyledEm>;
    }
    return child;
  });

  return (
    <StyledText ref={ref} as={as} color={color} typo={typo} isEllipsis={isEllipsis} {...rest}>
      {styledChildren}
    </StyledText>
  );
});

Text.defaultProps = {
  as: "span",
  typo: "body2_16_R",
  isEllipsis: false
};
