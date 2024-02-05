import styled, { DefaultTheme, css } from "styled-components";

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

export const IndicatorContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const activeStyle = ({ active, theme }: { active: boolean; theme: DefaultTheme }) =>
  active &&
  css`
    ${theme.typo.caption1_12_B};
    color: ${theme.colors.white};

    background-color: ${theme.colors.primaryColor};
    box-shadow: 0px 5px 10px 0px rgba(118, 93, 68, 0.3);
  `;

export const IndicatorButton = styled.button<{ active: boolean }>`
  display: flex;
  width: 100%;
  padding: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray_4};

  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme, active }) => activeStyle({ active, theme })}
`;
