import styled from "styled-components";
import { hexToRGBA } from "utils/color";

export const SliderContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 1 / 1;

  overscroll-behavior: contain;
`;

export const InnerShadow = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 60.75%);

  pointer-events: none;
`;

export const SlideWrapper = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
`;

export const SlideIndex = styled.span`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.125rem 0.5rem;
  left: 1.62rem;
  bottom: 2.12rem;

  border-radius: 90px;
  background-color: rgba(41, 41, 41, 0.55);
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.caption1_12_R};
`;

export const DotContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  bottom: 1.25rem;
  width: 100%;
`;

export const DotWrapper = styled.div`
  overflow: hidden;
  margin: auto;
  bottom: 0;

  list-style: none;
  text-align: center;

  &.custom-dots li {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin: 0;
  }

  &.custom-dots.slick-dots ul {
    padding: 0;
    display: flex;
    transition: all 0.2s;
    position: relative;
    margin: 0px;
  }

  &.custom-dots.slick-dots li.slick-active button::before {
    color: ${({ theme }) => theme.colors.primaryColor};
  }

  &.custom-dots.slick-dots li button::before {
    transition: font-size 0.35s;
    font-size: 10px;
    content: "•";

    opacity: 1;
    color: ${({ theme }) => theme.colors.white};
  }

  &.custom-dots.slick-dots li.small button::before {
    font-size: 7px;
    line-height: 20px;
  }
`;

export const IconButton = styled.button`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &[data-state="inactive"] {
    border: 1px solid ${({ theme }) => hexToRGBA(theme.colors.white, 0.8)};
    background-color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.8)};
  }

  &[data-state="active"] {
    border: 1px solid ${({ theme }) => hexToRGBA(theme.colors.white, 0.6)};
    background-color: rgba(0, 0, 0, 0.5);
  }

  transition: ${({ theme }) =>
    `${theme.transition.property.colors} ${theme.transition.duration["ultra-fast"]} ${theme.transition.easing["ease-in-out"]}`};
`;

export const SliderHeader = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  z-index: 3;
`;

export const TimeText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.body2_16_B};
`;

export const CommentBoxWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 90%;
  max-height: 65%;
  padding: 0.75rem 0.625rem;
  gap: 0.625rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  opacity: 0.65;

  &::before,
  &::after {
    content: "";
    position: absolute;
    background: url("/images/double-quotes-icon.svg") no-repeat center center;
    background-size: contain;
    width: 0.75rem;
    height: 0.75rem;
  }

  &::before {
    top: 0.75rem;
    left: 0.62rem;
  }

  &::after {
    bottom: 0.75rem;
    right: 0.62rem;
    transform: rotate(180deg);
  }
`;

export const CommentTextWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0.25rem 1rem;

  max-height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const CommentText = styled.pre`
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.label1_16_R};
  text-wrap: pretty;
  overflow-wrap: break-word;
  padding: 0 0.25rem;
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  border-radius: 50%;
`;

export const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;
