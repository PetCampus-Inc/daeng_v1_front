import { type CSSProp, css } from "styled-components";

import { type ButtonSizeSet } from "../types";

export const getSize = (size: ButtonSizeSet = "sm"): CSSProp => {
  return SIZE_MAP[size];
};

const XSmallSize = css`
  padding-inline: 12px;
  padding-block: 2px;
`;

const SmallSize = css`
  padding-inline: 12px;
  padding-block: 2px;
`;

const MediumSize = css`
  padding-inline: 20px;
  padding-block: 6px;
`;

const LargeSizes = css`
  padding-inline: 0px;
  padding-block: 12px;
`;

export const SIZE_MAP: Record<ButtonSizeSet, CSSProp> = {
  xs: XSmallSize,
  sm: SmallSize,
  md: MediumSize,
  lg: LargeSizes
};
