import styled, { CSSProp, css } from "styled-components";

import { getColorScheme } from "./colorScheme";
import { getPadding } from "./margin";
import { getRadius } from "./radius";
import { getSize } from "./size";
import { getWidth } from "./width";

import type {
  ButtonColorScheme,
  ButtonVariant,
  ButtonSizeSet,
  ButtonWidth,
  MarginOption
} from "../types";
import type { ColorKeys, TypoKeys } from "styles/types";

interface StyledButtonProps extends MarginOption {
  colorScheme: ButtonColorScheme;
  variant: ButtonVariant;
  size: ButtonSizeSet;
  width: ButtonWidth;
  typo: TypoKeys;
  gap?: number;
  color?: ColorKeys;
  bg?: ColorKeys;
  css?: CSSProp;
}

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "colorScheme",
      "size",
      "variant",
      "width",
      "typo",
      "bg",
      "color",
      "gap",
      "css",
      "pt",
      "pb",
      "pl",
      "pr",
      "paddingBlock",
      "paddingInline"
    ].includes(prop)
})<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;

  ${({ variant }) => getRadius(variant)};
  ${({ width }) => getWidth(width)};

  ${({ size, pt, pb, pl, pr, paddingBlock, paddingInline }) =>
    pt !== undefined ||
    pb !== undefined ||
    pl !== undefined ||
    pr !== undefined ||
    paddingBlock !== undefined ||
    paddingInline !== undefined
      ? getPadding({ pt, pb, pl, pr, paddingBlock, paddingInline })
      : getSize(size)};

  ${({ theme, colorScheme, color, bg }) =>
    color || bg
      ? css`
          color: ${theme.colors[color ?? ""]};
          background-color: ${theme.colors[bg ?? ""]};
        `
      : getColorScheme(colorScheme)};

  ${({ theme, typo }) => theme.typo[typo]};
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
