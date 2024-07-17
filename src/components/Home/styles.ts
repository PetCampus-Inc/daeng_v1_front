import styled, { css } from "styled-components";
import { remCalc } from "utils/calculator";

import type { ColorKeys } from "styles/types";
export { Img } from "styles/StyleModule";

export const StyledHgroup = styled.hgroup`
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 0 ${remCalc(10)};
  margin-bottom: ${remCalc(16 + 5)};
`;

export const ImgWrapperStyle = css`
  display: inline-block;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray_4};
`;

export const ImgWrapper = styled.span`
  width: 32px;
  height: 32px;

  border-radius: 50%;
  ${ImgWrapperStyle};
`;

export const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  grid-template-rows: auto;
  grid-gap: ${remCalc(14)};

  // selector로 직접 css 적용!

  & > .grid-left {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  & > .grid-top-right {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }

  & > .grid-bottom-right {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;
