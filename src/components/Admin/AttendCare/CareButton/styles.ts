import { styled } from "styled-components";

export const SendCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};

  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const CardTitle = styled.span`
  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.gray_1};
`;
export const CardSubTitle = styled.span`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const CardTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 8px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
`;

export const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  border-radius: 50%;

  &:active {
    background-color: ${({ theme }) => theme.colors.gray_5};
  }

  & > svg {
    color: ${({ theme }) => theme.colors.darkBlack};
  }
`;

export const Stack = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
