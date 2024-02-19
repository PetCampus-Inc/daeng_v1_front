import styled, { css, keyframes } from "styled-components";

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

export const PageContainer = styled.div<{ paddingTop?: string }>`
  padding: ${({ paddingTop }) => `calc(5vh + ${paddingTop})`} 16px 0;
  height: 100%;
`;

export const Background = styled.div<{ color?: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ color, theme }) => (color ? color : theme.colors.white)};
`;
