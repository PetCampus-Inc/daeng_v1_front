import styled, { css } from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 0 12px;
`;

export const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
