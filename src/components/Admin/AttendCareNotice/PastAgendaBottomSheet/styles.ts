import styled, { css } from "styled-components";

export const Content = styled.div`
  height: 80vh;
  width: 100%;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border-radius: 16px 16px 0px 0px;
  padding: 1.5rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.primaryColor};
  ${({ theme }) => theme.typo.body2_16_B};

  background-color: ${({ theme }) => theme.colors.yellow_3};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;

export const DateButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "clicked"
})<{ clicked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.br_3};
  ${({ theme }) => theme.typo.body2_16_B};
  span {
    ${({ theme }) => theme.typo.caption1_12_R};
    color: ${({ theme }) => theme.colors.br_2};
  }
  ${({ clicked }) =>
    clicked &&
    css`
      box-shadow: ${({ theme }) => theme.shadows.card};
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.primaryColor};
      span {
        color: ${({ theme }) => theme.colors.gray_2};
      }
    `}
`;

export const AgendaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  height: calc(100% - 20vh);
  padding: 2rem 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const AgendaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TitleAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.typo.body2_16_R};
`;

export const TextSpan = styled.span`
  width: 100%;
`;
