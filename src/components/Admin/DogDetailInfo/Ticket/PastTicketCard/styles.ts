import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};

  & > div:first-child {
    border: none;
    border-radius: 8px 8px 0 0;
    background-color: ${({ theme }) => theme.colors.gray_5};
    color: ${({ theme }) => theme.colors.darkBlack};
  }
`;

export const List = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.label2_14_R};
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray_5};
`;

export const ListInnerBox = styled.div`
  text-align: center;
  width: 60%;
  &.left {
    border-right: 1px solid ${({ theme }) => theme.colors.gray_4};
    width: 40%;
  }
`;
