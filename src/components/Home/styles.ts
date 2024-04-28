import styled, { css } from "styled-components";
import { remCalc } from "utils/calculator";
import { hexToRGBA } from "utils/color";

export const StyledHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 0 ${remCalc(10)};
  margin-bottom: ${remCalc(16 + 5)};
`;

const ImgWrapperStyle = css`
  display: inline-block;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray_4};
`;

export const ImgWrapper = styled.div`
  width: 32px;
  height: 32px;

  border-radius: 50%;
  ${ImgWrapperStyle}
`;

export const ProfileWrapper = styled.div`
  width: 44px;
  height: 44px;

  border-radius: 16px;
  ${ImgWrapperStyle}
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledNote = styled.div`
  position: relative;
  min-width: 196px;
`;

export const StyledBorder = styled.div`
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
    background-image: url("/images/spring-bound.svg");
    background-repeat: repeat-x;
    background-position: left center;
    background-size: contain;
  }
`;

export const StyledNoteContainer = styled.div`
  min-height: 185px;
  padding: ${remCalc(14 + 27)} ${remCalc(12)} ${remCalc(14)};

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const AttendanceCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${remCalc(14)};
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

export const StyledBox = styled.div`
  min-width: 148px;
  padding: ${remCalc(14)} ${remCalc(16)};

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.card};

  &.collapse {
    padding: ${remCalc(8)} ${remCalc(14)};
  }
`;
