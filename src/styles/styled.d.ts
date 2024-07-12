import "styled-components";
import { foundations } from "./foundations";
declare module "styled-components" {
  export interface DefaultTheme {
    colors: (typeof foundations)["colors"];
    typo: (typeof foundations)["typo"];
    zIndex: (typeof foundations)["zIndex"];
    shadows: (typeof foundations)["shadows"];
    transition: (typeof foundations)["transition"];
  }
}
