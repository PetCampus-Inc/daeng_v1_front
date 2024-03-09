import styled from "styled-components";

export const MainDogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 11px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ListTitle = styled.p`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AvatarList = styled.div`
  display: flex;
  gap: 16px;

  margin-top: 16px;
`;
