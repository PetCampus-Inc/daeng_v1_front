import type { CSSProperties } from "styled-components";
import type { TColor } from "styles/ThemeConfig";

export type TPaddingOptions = {
  pt?: number | string;
  pb?: number | string;
  pr?: number | string;
  pl?: number | string;
  padding?: string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingRight?: number | string;
  paddingLeft?: number | string;
  paddingInline?: number | string;
  paddingBlock?: number | string;
};

export type TColorScheme = {
  backgroundColor?: TColor;
  bg?: TColor;
};

export type TPositionOptions = {
  position?: CSSProperties["position"];
};

export type LayoutType = {
  type: "page" | "container";
};
