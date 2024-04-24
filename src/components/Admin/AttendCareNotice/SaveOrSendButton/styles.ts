import styled from "styled-components";

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  padding-top: 2rem;
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

  &[aria-disabled="true"] {
    background-color: ${({ theme }) => theme.colors.gray_4};
    color: ${({ theme }) => theme.colors.gray_2};
    tabindex: -1;
  }
`;

export const PrevButton = styled(Button)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.br_4};
  color: ${({ theme }) => theme.colors.primaryColor};
`;
