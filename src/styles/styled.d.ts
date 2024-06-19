import "styled-components";
import type { ColorKeys, TypoKeys, ShadowKeys, transitionKeys } from "styles/ThemeConfig";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorKeys;
    typo: TypoKeys;
    zIndex: ZIndexKeys;
    shadows: ShadowKeys;
    transition: transitionKeys;
  }
}
