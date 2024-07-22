import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  gap: 3vw;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
  width: 100%;
  padding: 16px 12px;
  background-color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.gray_1};
  border: 2px solid ${({ theme }) => theme.colors.gray_5};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadows.upper};
  cursor: pointer;

  &.active {
    background-color: ${({ theme }) => theme.colors.yellow_3};
    color: ${({ theme }) => theme.colors.primaryColor};
    border-color: transparent;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
