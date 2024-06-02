import { CSSProp } from "styled-components";

export type ICustomStyle = {
  css?: CSSProp;
};

export type TColorScheme = "primary" | "gray";

export type TPaddingOptions = {
  p?: number;
  pt?: number;
  pb?: number;
  ph?: number;
  pr?: number;
  pl?: number;
};
