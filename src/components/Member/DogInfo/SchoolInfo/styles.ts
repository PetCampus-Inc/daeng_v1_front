import styled from "styled-components";

export const Wrapper = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 12px;
`;

export const UpperContainer = styled.div`
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-radius: 12px 12px 0 0;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px;

  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-top: none;
  border-radius: 0 0 12px 12px;

  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.label2_14_R};
`;

export const DogDetailInfoText = styled.div`
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.label1_16_B};

  &.big {
    ${({ theme }) => theme.typo.body1_18_B};
  }

  &.explanation {
    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_2};
  }
`;

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

export const InnerFlexWrapper = styled.div`
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
