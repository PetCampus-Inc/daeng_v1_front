import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 0 12px;
  > div:last-child {
    border-bottom: none;
  }
`;

export const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FlexText = styled.p`
  &.title {
    display: flex;
    align-items: center;
    gap: 10px;

    ${({ theme }) => theme.typo.body2_16_R};
    color: ${({ theme }) => theme.colors.gray_1};
  }

  &.re-agree {
    display: flex;
    align-items: center;
    ${({ theme }) => theme.typo.caption1_12_R};
    color: ${({ theme }) => theme.colors.primary_3};
  }

  &.date {
    ${({ theme }) => theme.typo.caption1_12_R};
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;
