import { styled } from "styled-components";
import { hexToRGBA } from "utils/color";

export const Container = styled.label`
  position: relative;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 200ms ease-in-out;

  &[data-edit-mode="false"] {
    &:active {
      transform: scale(0.95);
      border-radius: 1rem;
      opacity: 0.8;
    }
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0;
  }

  &:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.primary_2};

    &:before {
      opacity: 0.3;
    }
  }
`;

export const CheckboxWrap = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;

  display: block;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.7)};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray_4};
  border-radius: 50%;
  transition: all 100ms ease-in-out;

  input {
    display: none;
  }

  &:has(input:checked) {
    background-color: ${({ theme }) => theme.colors.primary_3};
    box-shadow: 0 0 0 3px ${({ theme }) => hexToRGBA(theme.colors.primary_3, 0.5)};
    animation: checking 200ms linear;
  }

  @keyframes checking {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
`;

export const VideoIconWrap = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  opacity: 0.8;
`;
