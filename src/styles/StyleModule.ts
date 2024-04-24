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

export const Container = styled.div`
  position: relative;
`;

export const BackDrop = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
`;
