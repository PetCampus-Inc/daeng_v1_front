import { RuleSet, css } from "styled-components";

interface ISizes {
  [key: string]: number;
}

const sizes: ISizes = {
  mobile: 320,
  tablet: 768,
  laptop: 1024
};

interface MediaQueries {
  [key: string]: (...args: any[]) => RuleSet<object>;
}

const mediaQueries: MediaQueries = Object.keys(sizes).reduce((acc: MediaQueries, label: string) => {
  acc[label] = (...args: any[]) => css`
    @media screen and (max-width: ${sizes[label]}px) {
      ${css(...(args as [TemplateStringsArray, ...any[]]))};
    }
  `;
  return acc;
}, {});

export default mediaQueries;
