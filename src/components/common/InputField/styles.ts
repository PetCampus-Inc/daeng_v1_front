import styled from "styled-components";

export const Input = styled.input`
  display: flex;
  width: 100%;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};

  padding: 12px 18px;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.body2_16_R};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.br_3};
    &::placeholder {
      color: ${({ theme }) => theme.colors.primaryColor};
    }
  }

  outline: transparent solid 2px;
  outline-offset: 2px;
  overflow-y: hidden;

  transition:
    border,
    border-color 0.2s ease-out;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:not(:placeholder-shown) {
    border: 1px solid ${({ theme }) => theme.colors.gray_3};
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &:disabled {
    border: 1.012px solid ${({ theme }) => theme.colors.gray_4};
    background-color: ${({ theme }) => theme.colors.gray_5};
    color: ${({ theme }) => theme.colors.gray_2};
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray_4};
    }
  }
`;
