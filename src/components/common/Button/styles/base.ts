import { getColorStyle, getMarginStyle, getPaddingStyle } from "components/common/style-modules";
import styled, { css } from "styled-components";

import { getColorScheme } from "./colorScheme";
import { getRadius } from "./radius";
import { getSize } from "./size";
import { getWidth } from "./width";

import type { ButtonOption } from "../types";

const hasAnySpacingProp = (props: ButtonOption): boolean => {
  const spacingProps = [
    "m",
    "p",
    "margin",
    "padding",
    "mt",
    "pt",
    "mr",
    "pr",
    "mb",
    "pb",
    "ml",
    "pl",
    "mx",
    "my",
    "px",
    "py",
    "marginX",
    "marginY",
    "paddingX",
    "paddingY"
  ];
  return spacingProps.some((prop) => props[prop as keyof ButtonOption] !== undefined);
};

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "colorScheme",
      "size",
      "variant",
      "width",
      "typo",
      "bg",
      "bgColor",
      "backgroundColor",
      "color",
      "gap",
      "css",
      "m",
      "margin",
      "mt",
      "marginTop",
      "mr",
      "marginRight",
      "me",
      "marginEnd",
      "mb",
      "marginBottom",
      "ml",
      "marginLeft",
      "ms",
      "marginStart",
      "mx",
      "marginX",
      "my",
      "marginY",
      "p",
      "padding",
      "pt",
      "paddingTop",
      "pr",
      "paddingRight",
      "pe",
      "paddingEnd",
      "pb",
      "paddingBottom",
      "pl",
      "paddingLeft",
      "ps",
      "paddingStart",
      "px",
      "paddingX",
      "py",
      "paddingY",
      "marginBlock",
      "marginInline",
      "paddingBlock",
      "paddingInline"
    ].includes(prop)
})<ButtonOption>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;

  ${({ variant }) => variant && getRadius(variant)};
  ${({ width }) => width && getWidth(width)};

  ${(props) => {
    if (hasAnySpacingProp(props)) {
      return css`
        ${getMarginStyle(props)}
        ${getPaddingStyle(props)}
      `;
    }
    return props.size ? getSize(props.size) : null;
  }};

  ${(props) => {
    const { colorScheme, color, bg, bgColor, backgroundColor } = props;
    if (color || bg || bgColor || backgroundColor) {
      return getColorStyle({ color, bg, bgColor, backgroundColor });
    }
    return colorScheme ? getColorScheme(colorScheme) : null;
  }};

  ${({ theme, typo }) => typo && theme.typo[typo]};
  gap: ${({ gap }) => (gap ? `${gap}px` : "")};

  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: ${({ theme }) => theme.transition.easing["ease-in"]};
  transition-duration: ${({ theme }) => theme.transition.duration["fast"]};

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  ${({ css }) => css};

  cursor: pointer;
  user-select: none;
`;
