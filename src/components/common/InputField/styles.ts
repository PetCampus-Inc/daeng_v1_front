import styled from "styled-components";

interface InputFieldStyleProps {
  borderColor?: string;
}

export const Input = styled.input<InputFieldStyleProps>`
  display: flex;
  width: 100%;
  align-items: center;
  border: 1px solid
    ${({ borderColor }) => (borderColor ? borderColor : ({ theme }) => theme.colors.gray_4)};
  padding: 12px 18px;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.body2_16_R};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_3};
  }
  &.defaultValue {
    color: ${({ theme }) => theme.colors.gray_1};
  }
  &.default {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.br_2};
    color: ${({ theme }) => theme.colors.primaryColor};
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

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[type="search"] {
    padding-right: 50px;
    text-overflow: ellipsis;
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.gray_4};
    background-color: ${({ theme }) => theme.colors.gray_5};
    color: ${({ theme }) => theme.colors.gray_2};

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray_4};
    }
  }
`;
