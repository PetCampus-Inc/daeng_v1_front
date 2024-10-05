import { styled } from "styled-components";
import { dragNone } from "styles/StyleModule";
import { remCalc } from "utils/calculator";
import { hexToRGBA } from "utils/color";

export { Img } from "styles/StyleModule";

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

export const BoxContainer = styled.section`
  min-width: 132px;
  padding: ${remCalc(12)} ${remCalc(14)};

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  &.collapse {
    padding: ${remCalc(8)} ${remCalc(14)};
  }

  ${dragNone};
  cursor: pointer;
`;

export const NoteContainer = styled.section`
  position: relative;
  min-width: 174px;
`;

export const SpringBound = styled.div`
  position: absolute;
  width: 100%;
  min-height: 27px;
  background-color: ${({ theme }) => theme.colors.primary_4};
  border-radius: 16px 16px 0px 0px;

  &:before {
    content: "";
    position: absolute;
    display: block;
    margin: 0 1rem 0;
    left: 3px;
    right: 0;
    bottom: 5px;
    height: 30px;
    background-image: url("${process.env.REACT_APP_CLIENT_URL}/images/spring-bound.svg");
    background-repeat: repeat-x;
    background-position: left center;
    background-size: contain;
  }
`;

export const NoteContent = styled.div`
  min-height: 185px;
  padding: ${remCalc(14 + 27)} ${remCalc(10)} ${remCalc(14)} ${remCalc(10)};

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${remCalc(14)} ${remCalc(14)} ${remCalc(14)} ${remCalc(12)};
  margin-top: 1rem;

  border-image: linear-gradient(300deg, #fff9ea 0%, #ffffff 30%);
  border-image-slice: 1;
  border-radius: 16px;

  background-color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.7)};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const FootButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;

  border: 1px solid ${({ theme }) => theme.colors.gray_3};
  background-color: ${({ theme }) => theme.colors.white};

  & > svg {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  &.active {
    border: 1px solid ${({ theme }) => theme.colors.primaryColor};
    background-color: ${({ theme }) => theme.colors.primaryColor};

    & > svg {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  &.blur {
    border: 1px solid ${({ theme }) => theme.colors.br_3};
    background-color: ${({ theme }) => theme.colors.white};

    & > svg {
      color: ${({ theme }) => theme.colors.br_2};
    }
  }
`;
