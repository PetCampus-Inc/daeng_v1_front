import { themeConfig } from "./themeConfig";

export type ColorKeys = keyof (typeof themeConfig)["colors"];
export type TypoKeys = keyof (typeof themeConfig)["typo"];
export type ZIndexKeys = keyof (typeof themeConfig)["zIndex"];
export type ShadowKeys = keyof (typeof themeConfig)["shadows"];
export type transitionKeys = keyof (typeof themeConfig)["transition"];

export function isColorToken(key: any): key is ColorKeys {
  return key in themeConfig.colors;
}
