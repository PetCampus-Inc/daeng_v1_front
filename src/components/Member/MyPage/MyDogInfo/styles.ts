import styled from "styled-components";

export const DogInfoContainer = styled.section``;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 1.5rem 1rem 0;
`;

export const Title = styled.h3`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const DeleteDogButton = styled.button`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const MyDogInfoList = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  padding: 0 1rem;
  & > div {
    min-width: 100%;
  }
`;

export const DragCarouselWrapper = styled.div`
  width: 100%;
  & > div > div {
    padding: 0 1.5rem;
  }
`;
