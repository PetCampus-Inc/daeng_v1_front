import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 14px;
`;
import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const Caption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > p {
    ${({ theme }) => theme.typo.caption1_12_R};
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const Button = styled.button`
  display: flex;
  flex: 3;
  width: 100%;
  padding: 10px 0;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};

  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.white};
`;

export const PrevButton = styled(Button)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.br_4};
  color: ${({ theme }) => theme.colors.primaryColor};
`;
