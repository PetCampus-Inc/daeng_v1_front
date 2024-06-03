import styled from "styled-components";

export const OverlayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
`;

export const OverlayWrapper = styled.div`
  position: fixed;
  width: calc(100% - 2rem);
`;

export const SliderContainer = styled.div`
  position: relative;
  aspect-ratio: 5 / 7;

  background-color: ${({ theme }) => theme.colors.darkBlack};
  border-radius: 12px;
  overflow: hidden;

  overscroll-behavior: contain;
`;

export const SliderHeader = styled.div`
  position: absolute;
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 0.5rem;
  gap: 0.625rem;

  z-index: 3;
`;

export const SlideWrapper = styled.div`
  position: relative;
  aspect-ratio: 5 / 7;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const SlideIndexWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 1rem;

  width: 100%;
`;

export const SlideIndex = styled.span`
  padding: 2px 8px;

  border-radius: 90px;
  background-color: rgba(41, 41, 41, 0.55);
`;
