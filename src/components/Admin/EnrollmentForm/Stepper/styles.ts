// FIXME: 폼 공통 스타일.. 만들기
import styled, { DefaultTheme, css } from "styled-components";

const activeStyle = (active: boolean, theme: DefaultTheme) =>
  active &&
  css`
    ${theme.typo.caption1_12_B};
    color: ${theme.colors.white};

    background-color: ${theme.colors.primaryColor};
    box-shadow: 0px 5px 10px 0px rgba(118, 93, 68, 0.3);
  `;

export const IndicatorButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active"
})<{ active: boolean }>`
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
  ${({ theme, active }) => activeStyle(active, theme)}
`;
