import { foundations } from "./foundations";

export const ThemeConfig = {
  ...foundations
};

export type TColor = keyof (typeof ThemeConfig)["colors"];
export type TTypo = keyof (typeof ThemeConfig)["typo"];
