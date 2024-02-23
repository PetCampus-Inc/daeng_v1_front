import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 8px;
`;

export const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 20px 16px;

  &.upper {
    border-radius: 8px 8px 0 0;
    background-color: ${({ theme }) => theme.colors.yellow_3};
  }
  &.lower {
    border-radius: 0 0 8px 8px;
    background-color: ${({ theme }) => theme.colors.white};
    gap: 8px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  &.upper {
    justify-content: space-between;
  }
`;

export const Text = styled.p`
  &.ticket {
    color: ${({ theme }) => theme.colors.primaryColor};
    ${({ theme }) => theme.typo.caption1_12_B};
  }

  &.count {
    color: ${({ theme }) => theme.colors.darkBlack};
    ${({ theme }) => theme.typo.body1_18_B};
  }

  &.detail {
    color: ${({ theme }) => theme.colors.gray_1};
    ${({ theme }) => theme.typo.label2_14_R};
  }
`;
