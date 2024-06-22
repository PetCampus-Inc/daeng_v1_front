import { css } from "styled-components";

import type { MarginOption } from "../types";

export const getPadding = ({ pt, pb, pl, pr, paddingBlock, paddingInline }: MarginOption) => css`
  ${pt !== undefined ? `padding-top: ${pt}px;` : ""}
  ${pb !== undefined ? `padding-bottom: ${pb}px;` : ""}
  ${pl !== undefined ? `padding-left: ${pl}px;` : ""}
  ${pr !== undefined ? `padding-right: ${pr}px;` : ""}
  ${paddingBlock !== undefined ? `padding-block: ${paddingBlock}px;` : ""}
  ${paddingInline !== undefined ? `padding-inline: ${paddingInline}px;` : ""}
`;
