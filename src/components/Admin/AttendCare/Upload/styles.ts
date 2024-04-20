export {
  StyledDeleteButton,
  StyledThumbImg,
  InnerShadow
} from "components/common/ImageUpload/styles";
import styled, { css } from "styled-components";
import { remCalc } from "utils/calculator";

export const StyledHiddenUpload = styled.input`
  display: none;
`;

const ImgStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90px;
  height: 90px;
  aspect-ratio: 1/1;

  border-radius: 8px;

  flex-shrink: 0; // flex item이 shrink되지 않도록 설정
`;

export const StyledUpload = styled.label`
  ${ImgStyle};

  background-color: ${({ theme }) => theme.colors.gray_4};
  padding: ${remCalc("8px")} ${remCalc("12px")} ${remCalc("8px")} ${remCalc("12px")};

  cursor: pointer;
`;

export const StyledThumb = styled.div`
  ${ImgStyle};

  overflow: hidden;
  position: relative;
  border-radius: 8px;
`;

export const StyledText = styled.span`
  position: absolute;
  right: 8px;
  bottom: 4px;

  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.white};

  z-index: 2;
`;

export const StyledThumbList = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: ${remCalc("12px")} 0 ${remCalc("10px")}; // 스크롤 영역 띄우기
  margin: ${remCalc("10px")} 0 ${remCalc("26px")};

  overflow-x: auto;

  scroll-snap-type: y mandatory;
  scroll-snap-stop: always;
  scrollbar-width: thin;
`;
