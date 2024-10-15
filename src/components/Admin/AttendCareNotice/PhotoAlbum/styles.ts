import styled from "styled-components";
export const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
`;

export const ImageWrapper = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  aspect-ratio: 1 / 1;
`;

export const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9;
`;

export const CountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const Count = styled.p`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.white};

  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.55);
  border-radius: 9999px;
`;
