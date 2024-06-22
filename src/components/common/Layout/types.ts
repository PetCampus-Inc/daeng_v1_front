import type { CSSProperties } from "styled-components";
import type { ColorKeys } from "styles/types";

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

export type ColorKeysScheme = {
  backgroundColor?: ColorKeys;
  bg?: ColorKeys;
};

export type TPositionOptions = {
  position?: CSSProperties["position"];
};

export type LayoutType = {
  type: "page" | "container";
};
