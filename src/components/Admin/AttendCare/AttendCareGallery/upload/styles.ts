export {
  StyledDeleteButton,
  StyledThumbImg,
  InnerShadow
} from "components/common/ImageUpload/styles";
import { motion } from "framer-motion";
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
  padding: ${remCalc("12px")} 0 ${remCalc("10px")}; // 스크롤 영역 띄우기
  margin: ${remCalc("10px")} 0 ${remCalc("26px")};

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  touch-action: pan-x;
  scrollbar-width: thin;
`;

export const StyledPreview = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 65%;
  margin: 1rem;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const PreviewItem = styled.div`
  width: 100%;
  height: 100%;
`;

export const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  background-color: transparent;

  z-index: 3;

  & > svg {
    width: 30px;
    height: 30px;

    & > .icon-circle {
      mix-blend-mode: difference;
      fill: ${({ theme }) => theme.colors.darkBlack};
      opacity: 0.7;
    }

    & > .icon-path {
      color: ${({ theme }) => theme.colors.gray_4};
    }
  }
`;
