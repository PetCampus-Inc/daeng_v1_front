import { type CSSProp, css } from "styled-components";

import type { ButtonOption, ButtonVariant } from "../types";

export const getRadius = (radii: NonNullable<ButtonOption["variant"]>): CSSProp => {
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
