import { ThemeConfig } from "./ThemeConfig";

export type ColorKeys = keyof (typeof ThemeConfig)["colors"];
export type TypoKeys = keyof (typeof ThemeConfig)["typo"];
export type ZIndexKeys = keyof (typeof ThemeConfig)["zIndex"];
export type ShadowKeys = keyof (typeof ThemeConfig)["shadows"];
export type transitionKeys = keyof (typeof ThemeConfig)["transition"];
