import { css } from "styled-components";
import { themeConfig } from "styles/themeConfig";
import { hexToHSL } from "utils/color";

import type { ButtonColorScheme } from "../types";
import type { ColorKeys } from "styles/types";

const theme = themeConfig;

export interface ColorSchemeStyles {
  background: ColorKeys;
  color: ColorKeys;
}

export const colorSchemes: Record<ButtonColorScheme, ColorSchemeStyles> = {
  primary: { background: "primaryColor", color: "white" },
  br_4: { background: "br_4", color: "primaryColor" },
  br_5: { background: "br_5", color: "primaryColor" },
  yellow_3: { background: "yellow_3", color: "primaryColor" },
  gray_1: { background: "gray_1", color: "white" },
  gray_2: { background: "gray_2", color: "white" },
  gray_3: { background: "gray_4", color: "gray_2" },
  gray_4: { background: "gray_4", color: "gray_3" },
  gray_5: { background: "gray_5", color: "gray_2" },
  white: { background: "white", color: "gray_1" },
  red_1: { background: "red_1", color: "white" },
  red_2: { background: "red_2", color: "red_1" }
};

const createColorScheme = (color: ColorKeys) => {
  const hexColor = theme.colors[color];
  return {
    base: hexColor,
    light: hexToHSL(hexColor, -5),
    dark: hexToHSL(hexColor, -15)
  };
};

export const getColorScheme = (scheme: ButtonColorScheme) => {
  const { background, color } = colorSchemes[scheme];
  const colorScheme = createColorScheme(background);

  return css`
    color: ${theme.colors[color]};
    background: ${colorScheme.base};
    border: 1px solid transparent;

    &:hover {
      background: ${colorScheme.light};
    }

    &:active {
      background: ${colorScheme.dark};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${theme.colors.gray_4};
      color: ${theme.colors.gray_2};
    }
  `;
};
