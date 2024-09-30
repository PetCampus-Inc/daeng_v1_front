import styled from "styled-components";
import { hexToRGBA } from "utils/color";

export const Container = styled.div`
  position: relative;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;
  aspect-ratio: 0.7;
  background-color: ${({ theme }) => hexToRGBA(theme.colors.black, 0.7)};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: 0.8rem;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  z-index: 12;
`;

export const CheckBoxWrap = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;
