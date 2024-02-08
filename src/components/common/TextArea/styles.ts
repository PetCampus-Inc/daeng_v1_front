import styled from "styled-components";

export const TextAreaInput = styled.textarea.withConfig({
  shouldForwardProp: (prop) => !["resizable"].includes(prop)
})<{
  resizable: boolean;
  readOnly: boolean;
}>`
  all: unset;
  display: block;
  width: 100%;
  background-color: ${(props) =>
    props.readOnly ? props.theme.colors.gray_5 : props.theme.colors.white};

  padding: 12px 18px;
  border-radius: 8px;
  border: ${(props) => (props.readOnly ? "none" : `1px solid ${props.theme.colors.gray_4}`)};

  ${({ theme }) => theme.typo.label1_16_R};
  color: ${({ theme }) => theme.colors.gray_1};
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;

  resize: ${(prop) => (prop.resizable ? "vertical" : "none")};
  box-sizing: border-box;

  outline: transparent solid 2px;
  outline-offset: 2px;
  overflow-y: hidden;

  transition:
    border-color,
    box-shadow 0.2s ease-out;

  ${({ readOnly, theme }) =>
    !readOnly &&
    `
    &:focus-visible {
      border-color: ${theme.colors.br_3};
      box-shadow: ${theme.colors.br_3} 0px 0px 0px 1px;
    }
  `}

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;
