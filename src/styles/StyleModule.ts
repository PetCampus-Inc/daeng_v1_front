import { motion } from "framer-motion";
import styled, { css, keyframes } from "styled-components";

import type { TColor } from "./ThemeConfig";

// CSS 속성중 자주쓰이는 조합들 모아놓은것

export const selectNone = css`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const dragNone = css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const imgDragNone = css`
  -webkit-user-drag: none;
`;

export const apperanceNone = css`
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !["pt", "pb", "ph", "pr", "pl", "color", "auto"].includes(prop)
})<{
  pt?: string;
  pb?: string;
  ph?: string; // 좌우 동일 padding
  pr?: string;
  pl?: string;
  color?: TColor;
  auto?: string;
}>`
  padding-top: ${({ pt }) => (pt ? `calc(5vh + ${pt}rem)` : "calc(5vh)")};
  padding-bottom: ${({ pb }) => (pb ? `calc(7vh + ${pb}rem)` : 0)};
  padding-left: ${({ pl, ph }) => (pl ? `${pl}rem` : ph ? `${ph}rem` : "1rem")};
  padding-right: ${({ pr, ph }) => (pr ? `${pr}rem` : ph ? `${ph}rem` : "1rem")};
  background-color: ${({ color, theme }) => (color ? theme.colors[color] : theme.colors.white)};
  width: 100vw;
  // height: 100%;
  height: ${({ auto }) => (auto ? "auto" : "100%")};
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_5};
    border-radius: 50%;
  }

  transition: background-color 0.2s ease-in-out;
`;

export const ConfirmButton = styled.button`
  display: flex;
  width: 100%;
  padding: 11px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typo.label1_16_B};
`;

// 폼 버튼 스타일

export const FormButtonWrapper = styled.div`
  display: flex;
  margin: 0.25rem 0.15rem 1.25rem;
  gap: 4px;
`;

export const FormButton = styled.button`
  display: flex;
  flex: 3;
  width: 100%;
  padding: 0.625rem 0;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};

  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.white};

  &[aria-disabled="true"] {
    background-color: ${({ theme }) => theme.colors.gray_4};
    color: ${({ theme }) => theme.colors.gray_2};
    tabindex: -1;
  }
`;

export const FormPrevButton = styled(FormButton)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.br_4};
  color: ${({ theme }) => theme.colors.primaryColor};
`;

// img tag
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
