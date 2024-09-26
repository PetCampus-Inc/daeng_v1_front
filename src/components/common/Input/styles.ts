import styled, { css, type CSSProp } from "styled-components";
import { remCalc } from "utils/calculator";

interface InputFieldStyleProps {
  css?: CSSProp;
}

const defaultStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  padding: 12px 18px;

  ${({ theme }) => theme.typo.body2_16_R};
`;

export const Input = styled.input<InputFieldStyleProps>`
  display: flex;
  width: 100%;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray_1};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  ${({ css }) => css || defaultStyles};

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

  &.error-input {
    color: ${({ theme }) => theme.colors.red_1};
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }

  &[type="search"] {
    padding-right: 50px;
    text-overflow: ellipsis;
  }

  &.pw {
    &[type="text"] {
      padding-right: 50px;
      text-overflow: ellipsis;
    }

    &[type="password"] {
      padding-right: 50px;
      text-overflow: ellipsis;
    }
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

export const StyledInputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledInputButton = styled.button`
  all: unset;
  height: 100%;
  padding-right: 1rem;
  aspect-ratio: 1/1;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > svg {
    color: ${({ theme }) => theme.colors.gray_2};
  }

  &:disabled > svg {
    color: ${({ theme }) => theme.colors.gray_4};
  }
`;

export const StyledInputSuffix = styled.span`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.label2_14_R}
`;

export const StyledButtonWrapper = styled.div`
  all: unset;
  padding-right: 1rem;

  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

export const StyledConfirmButton = styled.button`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-inline: ${remCalc(10)};

  ${({ theme }) => theme.typo.label2_14_M};

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};

  &.inactive {
    background-color: ${({ theme }) => theme.colors.gray_5};
    color: ${({ theme }) => theme.colors.gray_3};
  }

  &[data-state-hidden="true"] {
    display: none;
  }

  transition:
    background-color 0.2s ease-out,
    color 0.2s ease-out;

  cursor: pointer;
`;
