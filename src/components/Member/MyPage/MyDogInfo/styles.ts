import styled from "styled-components";

export const DogInfoContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
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
  display: flex;
  gap: 0.75rem;
`;
