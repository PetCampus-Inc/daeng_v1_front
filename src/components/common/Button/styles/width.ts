import { css } from "styled-components";

import type { ButtonOption } from "../types";

export const getWidth = (width: ButtonOption["width"]) => {
  if (!width || width === "auto")
    return css`
      width: auto;
    `;
  if (width === "full")
    return css`
      width: 100%;
    `;
  return css`
    width: ${width}px;
  `;
};
