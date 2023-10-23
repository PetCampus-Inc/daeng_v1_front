import "styled-components";

declare module "styled-components" {
  export interface IThemeConfig {
    primaryColor: string;
    primary_2: string;
    primary_3: string;
    primary_4: string;
    white: string;
    black: string;
    darkBlack: string;
    red_1: string;
    yellow_1: string;
    yellow_2: string;
    yellow_3: string;
    gray_1: string;
    gray_2: string;
    gray_3: string;
    gray_4: string;
    gray_5: string;

    secondColor: string;
    thirdColor: string;
    fourthColor: string;
    backGroundColor: string;
    navBg: string;
    lightMainColor: string;
    interfaceBg: string;
  }
}
