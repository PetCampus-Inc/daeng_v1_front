import styled, { css } from "styled-components";

export const Textarea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => !["isChecked"].includes(prop)
})<{ isChecked?: boolean }>`
  all: unset;
  display: block;
  width: 100%;
  padding: 12px 18px;
  border-radius: 8px;
  box-sizing: border-box;
  outline: transparent solid 2px;
  outline-offset: 2px;
  overflow-y: hidden;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  transition:
    color 0.2s ease-out,
    border-color 0.2s ease-out;

  ${({ theme }) => theme.typo.label1_16_R};

  ${({ theme, isChecked }) => css`
    background-color: ${isChecked ? theme.colors.br_5 : theme.colors.white};
    border: 1px solid ${isChecked ? theme.colors.br_2 : theme.colors.gray_4};
    color: ${isChecked ? theme.colors.primaryColor : theme.colors.gray_1};

    &::placeholder {
      color: ${theme.colors.gray_3};
    }

    &:focus {
      outline: none;
      border-color: ${theme.colors.br_2};
      color: ${theme.colors.primaryColor};
    }

    &:not(:focus):not(:placeholder-shown) {
      border-color: ${theme.colors.gray_3};
    }

    &:disabled {
      border-color: ${theme.colors.gray_4};
      background-color: ${isChecked ? theme.colors.br_5 : theme.colors.gray_5};
      color: ${isChecked ? theme.colors.primaryColor : theme.colors.gray_2};

      &::placeholder {
        color: ${theme.colors.gray_4};
      }
    }
  `}
`;
