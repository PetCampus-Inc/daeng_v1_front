import styled, { css } from "styled-components";

export const FootButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isFocus"
})<{ isFocus?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.primaryColor};
  background-color: ${({ theme }) => theme.colors.primaryColor};

  & > svg {
    color: ${({ theme }) => theme.colors.white};
  }

  &.active {
    border-color: ${({ theme }) => theme.colors.br_2};
    background-color: ${({ theme }) => theme.colors.white};

    & > svg {
      color: ${({ theme }) => theme.colors.br_2};
    }
  }

  ${({ isFocus, theme }) =>
    isFocus &&
    css`
      opacity: 0.5;
      border-color: ${theme.colors.gray_3};
      background-color: ${theme.colors.white};

      & > svg {
        color: ${theme.colors.gray_3};
      }

      &.active {
        border-color: ${theme.colors.gray_3};
        & > svg {
          color: ${theme.colors.gray_3};
        }
      }
    `}
`;

export const AttendanceButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isFocus"
})<{ isFocus: boolean }>`
  min-width: 70px;
  display: flex;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 50px;
  border: 1px solid ${({ theme }) => theme.colors.primaryColor};
  background-color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typo.label2_14_B};
  color: ${({ theme }) => theme.colors.primaryColor};

  ${({ isFocus, theme }) =>
    isFocus &&
    `
    opacity: 0.5;
    border: 1px solid ${theme.colors.gray_3};
    background-color: ${theme.colors.gray_5}; 
    color: ${theme.colors.gray_3};
    `}
`;

export const RootContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isFocus"
})<{ isFocus: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-inline: 16px;

  & > * {
    opacity: ${({ isFocus }) => (isFocus ? 0.5 : 1)};
  }

  &.attend {
    padding-bottom: 96px; /* 하단버튼 영역 */
  }
`;

export const ScrollableContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding-bottom: 16px;
`;

export const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 16px;
`;
