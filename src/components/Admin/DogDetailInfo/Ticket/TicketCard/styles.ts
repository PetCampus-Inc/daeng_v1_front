import styled from "styled-components";

export const Container = styled.div`
  position: relative;
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
    &.red {
      color: ${({ theme }) => theme.colors.red_1};
    }
  }
`;

export const BlackCover = styled.button`
  position: absolute;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
`;

export const RenewButton = styled.span`
  background-color: ${({ theme }) => theme.colors.red_2};
  color: ${({ theme }) => theme.colors.red_1};
  ${({ theme }) => theme.typo.label2_14_B};
  padding: 6px 21px;
  border-radius: 28px;
`;
