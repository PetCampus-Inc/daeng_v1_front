import styled from "styled-components";

export const TextAreaInput = styled.textarea.withConfig({
  shouldForwardProp: (prop) => !["resizable"].includes(prop)
})<{
  resizable: boolean;
  $isChecked: boolean;
}>`
  all: unset;
  display: block;
  width: 100%;
  background-color: ${(props) =>
    props.$isChecked ? props.theme.colors.br_5 : props.theme.colors.white};

  padding: 12px 18px;
  border-radius: 8px;
  border: ${(props) =>
    props.$isChecked
      ? `1px solid ${props.theme.colors.br_2}`
      : `1px solid ${props.theme.colors.gray_4}`};

  ${({ theme }) => theme.typo.label1_16_R};
  color: ${(props) =>
    props.$isChecked ? props.theme.colors.primaryColor : props.theme.colors.gray_1};
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;

  resize: ${(prop) => (prop.resizable ? "vertical" : "none")};
  box-sizing: border-box;

  outline: transparent solid 2px;
  outline-offset: 2px;
  overflow-y: hidden;

  transition: border-color 0.2s ease-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  &:not(:placeholder-shown) {
    border: 1px solid ${({ theme }) => theme.colors.gray_3};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.br_3};
    &::placeholder {
      color: ${({ theme }) => theme.colors.primaryColor};
    }
  }

  &:disabled {
    border: 1.012px solid ${({ theme }) => theme.colors.gray_4};
    background-color: ${({ theme }) => theme.colors.gray_5};
    color: ${({ theme }) => theme.colors.gray_2};
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray_4};
    }
    ${(props) =>
      props.$isChecked &&
      `
    background-color: ${props.theme.colors.br_5};
    border: 1px solid ${props.theme.colors.br_2};
    color: ${props.theme.colors.primaryColor};
    `}
`;
