import { forwardRef, type ReactElement, type CSSProperties, type ElementType } from "react";

import { StyledText } from "./styles";

import type { PolymorphicComponentPropsWithRef, PolymorphicRef } from "styles/system";
import type { ColorKeys, TypoKeys } from "styles/types";

export type TextOptions = {
  color?: ColorKeys;
  typo?: TypoKeys;
  isEllipsis?: boolean;
  textAlign?: CSSProperties["textAlign"];
  whiteSpace?: CSSProperties["whiteSpace"];
  textDecoration?: CSSProperties["textDecoration"];
};

type TextProps<C extends ElementType = "span"> = PolymorphicComponentPropsWithRef<C, TextOptions>;

type TextComponent = <C extends ElementType = "span">(props: TextProps<C>) => ReactElement;

export const Text: TextComponent = forwardRef(function Text<C extends ElementType = "span">(
  props: TextProps<C>,
  ref?: PolymorphicRef<C>
) {
  const {
    as = "span",
    color = "darkBlack",
    typo = "body2_16_R",
    isEllipsis = false,
    children,
    ...rest
  } = props;
  return (
    <StyledText as={as} ref={ref} typo={typo} color={color} isEllipsis={isEllipsis} {...rest}>
      {children}
    </StyledText>
  );
}) as TextComponent;
