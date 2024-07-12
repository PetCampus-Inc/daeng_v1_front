import { css } from "styled-components";
import { remCalc } from "utils/calculator";

const typoCreator = (
  fontSize: string,
  fontWeight: number,
  letterSpacing: string,
  lineHeight: string
) => {
  return css`
    font-size: ${remCalc(fontSize)};
    font-weight: ${fontWeight};
    letter-spacing: ${remCalc(letterSpacing)};
    line-height: ${remCalc(lineHeight)};
  `;
};

export const typo = {
  title1_24_B: typoCreator("24px", 700, "-1.2px", "32px"),
  title1_24_R: typoCreator("24px", 400, "-1.2px", "26px"),
  title2_20_B: typoCreator("20px", 700, "-0.24px", "28px"),
  title2_20_R: typoCreator("20px", 400, "-1.2px", "26px"),
  title3_28_B: typoCreator("28px", 700, "0px", "40px"),
  body1_18_B: typoCreator("18px", 700, "0px", "27px"),
  body1_18_R: typoCreator("18px", 400, "-1.2px", "26px"),
  body2_16_B: typoCreator("16px", 700, "-1.2px", "23px"),
  body2_16_R: typoCreator("16px", 400, "-0.192px", "23px"),
  label1_16_B: typoCreator("16px", 700, "-0.192px", "24px"),
  label1_16_M: typoCreator("16px", 500, "-1.2px", "24px"),
  label1_16_R: typoCreator("16px", 400, "-0.192px", "24px"),
  label2_14_B: typoCreator("14px", 700, "0.28px", "20px"),
  label2_14_M: typoCreator("14px", 500, "0.28px", "25px"),
  label2_14_R: typoCreator("14px", 400, "0.28px", "20px"),
  caption1_12_R: typoCreator("12px", 400, "-0.12px", "17.5px"),
  caption1_12_B: typoCreator("12px", 700, "0.24px", "20px"),
  caption1_10_R: typoCreator("10px", 400, "-0.12px", "17.5px")
};
