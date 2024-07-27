import { css } from "styled-components";
import { themeConfig } from "styles/themeConfig";
import { remCalc } from "utils/calculator";
import { isNumber } from "utils/is";

import type {
  SizeType,
  SpaceType,
  RadiusType,
  DisplayProps,
  SizeProps,
  SpacingProps,
  ColorProps,
  PositionProps,
  FlexBoxProps,
  BorderProps,
  RadiusProps
} from "./style-props";

// Utility functions
export const parseSize = (size?: SizeType): string | undefined => {
  if (size === undefined) return undefined;
  if (typeof size === "number") return `${size}px`;
  switch (size) {
    case "full":
      return "100%";
    case "fit":
      return "fit-content";
    case "min":
      return "min-content";
    case "max":
      return "max-content";
    case "auto":
      return "auto";
    default:
      return size;
  }
};

export const parseSpacing = (value?: SpaceType): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === "number" || value.endsWith("px")) return remCalc(value);
  return value;
};

export const getBorderRadiusStyle = (radiusValue?: RadiusType): string | undefined => {
  if (radiusValue === undefined) return undefined;
  if (isNumber(radiusValue)) return `${radiusValue}px`;
  switch (radiusValue) {
    case "rectangle":
      return "8px";
    case "circle":
      return "50%";
    default:
      return radiusValue;
  }
};

// Style functions

export const getDisplayStyle = (props: DisplayProps) => css`
  display: ${props.display};
`;

export const getSizeStyle = (props: SizeProps) => css`
  width: ${parseSize(props.width)};
  height: ${parseSize(props.height)};
  max-width: ${parseSize(props.maxWidth)};
  min-width: ${parseSize(props.minWidth)};
`;

export const getMarginStyle = (props: SpacingProps) => css`
  margin: ${parseSpacing(props.m) || parseSpacing(props.margin)};
  margin-top: ${parseSpacing(props.mt) || parseSpacing(props.marginTop)};
  margin-right: ${parseSpacing(props.mr) || parseSpacing(props.marginRight)};
  margin-bottom: ${parseSpacing(props.mb) || parseSpacing(props.marginBottom)};
  margin-left: ${parseSpacing(props.ml) || parseSpacing(props.marginLeft)};
  margin-inline: ${parseSpacing(props.mx) ||
  parseSpacing(props.marginX) ||
  parseSpacing(props.marginInline)};
  margin-block: ${parseSpacing(props.my) ||
  parseSpacing(props.marginY) ||
  parseSpacing(props.marginBlock)};
`;

export const getPaddingStyle = (props: SpacingProps) => css`
  padding: ${parseSpacing(props.p) || parseSpacing(props.padding)};
  padding-top: ${parseSpacing(props.pt) || parseSpacing(props.paddingTop)};
  padding-right: ${parseSpacing(props.pr) || parseSpacing(props.paddingRight)};
  padding-bottom: ${parseSpacing(props.pb) || parseSpacing(props.paddingBottom)};
  padding-left: ${parseSpacing(props.pl) || parseSpacing(props.paddingLeft)};
  padding-inline: ${parseSpacing(props.px) ||
  parseSpacing(props.paddingX) ||
  parseSpacing(props.paddingInline)};
  padding-block: ${parseSpacing(props.py) ||
  parseSpacing(props.paddingY) ||
  parseSpacing(props.paddingBlock)};
`;

export const getBorderStyle = (props: BorderProps & RadiusProps) => css`
  border: ${props.border ? `${props.border}px solid` : undefined};
  border-top: ${props.borderTop ? `${props.borderTop}px solid` : undefined};
  border-right: ${props.borderRight ? `${props.borderRight}px solid` : undefined};
  border-bottom: ${props.borderBottom ? `${props.borderBottom}px solid` : undefined};
  border-left: ${props.borderLeft ? `${props.borderLeft}px solid` : undefined};
  border-color: ${props.borderColor ? themeConfig.colors[props.borderColor] : undefined};
  border-radius: ${getBorderRadiusStyle(props.borderRadius || props.radius)};
`;

export const getColorStyle = (props: ColorProps) => css`
  background: ${props.bg ? themeConfig.colors[props.bg] : undefined};
  background-color: ${props.bgColor
    ? themeConfig.colors[props.bgColor]
    : props.backgroundColor
      ? themeConfig.colors[props.backgroundColor]
      : undefined};
  color: ${props.color ? themeConfig.colors[props.color] : undefined};
`;

export const getPositionStyle = (props: PositionProps) => css`
  position: ${props.position};
  top: ${isNumber(props.top) ? remCalc(props.top) : props.top};
  bottom: ${isNumber(props.bottom) ? remCalc(props.bottom) : props.bottom};
  left: ${isNumber(props.left) ? remCalc(props.left) : props.left};
  right: ${isNumber(props.right) ? remCalc(props.right) : props.right};
  z-index: ${props.zIndex};
`;

export const getFlexStyle = (props: FlexBoxProps) => css`
  display: ${props.display};
  flex-direction: ${props.direction};
  justify-content: ${props.justify};
  align-items: ${props.align};
  flex: ${props.flex};
  gap: ${props.gap ? `${props.gap}px` : undefined};
  flex-wrap: ${props.wrap};
  flex-basis: ${props.basis};
  flex-grow: ${props.grow};
  flex-shrink: ${props.shrink};
`;
