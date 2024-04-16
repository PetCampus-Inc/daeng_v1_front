import styled from "styled-components";

export const GridAlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.8rem;
  padding: 0 0.1rem;

  .inner {
    gap: 0.6rem;
  }
`;

export const GridPictures = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 4px;
`;

export const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0.5rem;
`;
export const DateText = styled.span`
  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const CountText = styled.span`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;
