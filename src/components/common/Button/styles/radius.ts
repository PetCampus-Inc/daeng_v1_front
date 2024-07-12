import { type CSSProp, css } from "styled-components";

import type { ButtonVariant } from "../types";

export const getRadius = (radii: ButtonVariant): CSSProp => {
  const radiusStyles: Record<ButtonVariant, CSSProp> = {
    rectangle: css`
      border-radius: 8px;
    `,
    pill: css`
      border-radius: 99px;
    `
  };

  if (typeof radii === "number") {
    return css`
      border-radius: ${radii}px;
    `;
  }

  return radiusStyles[radii];
};
