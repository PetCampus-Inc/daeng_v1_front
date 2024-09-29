import styled from "styled-components";
import { hexToRGBA } from "utils/color";

export const Container = styled.div`
  position: relative;
  height: 100%;
`;

export const Video = styled.video`
  position: absolute;
  width: 100%;
  object-fit: cover;

  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 200ms ease-in-out;
  opacity: 0.9;

  &[data-show-controller="false"] {
    opacity: 0;
    pointer-events: none;
  }
`;

export const VideoControllerWrap = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  padding: 0 1.8rem;
  transition: opacity 200ms ease-in-out;

  &[data-show-controller="false"] {
    opacity: 0;
    pointer-events: none;
  }
`;

export const RangeInput = styled.input`
  width: 100%;
  background: ${({ theme }) => hexToRGBA(theme.colors.white, 0.4)};
  outline: none;
  height: 5px;
  border-radius: 2px;

  appearance: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;

    width: 1rem;
    height: 1rem;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const TimeToolTip = styled.div`
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);

  background: ${({ theme }) => hexToRGBA(theme.colors.darkBlack, 0.7)};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.25rem 1rem;
  border-radius: 2rem;
  font-size: ${({ theme }) => theme.typo.body2_16_R};
  white-space: nowrap;

  pointer-events: none;
`;
