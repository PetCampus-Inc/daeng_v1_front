import styled from "styled-components";

export const TextArea = styled.textarea<{
  resizable: boolean;
  readOnly: boolean;
}>`
  all: unset;
  display: block;
  width: 100%;
  background-color: ${(props) => (props.readOnly ? props.theme.gray_5 : props.theme.white)};

  padding: 12.14px 18.22px;
  border-radius: 8px;
  border: ${(props) => (props.readOnly ? "none" : `1px solid ${props.theme.gray_4}`)};

  ${({ theme }) => theme.typo.label1_16_R};
  color: ${({ theme }) => theme.gray_1};
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
      border-color: ${theme.br_3};
      box-shadow: ${theme.br_3} 0px 0px 0px 1px;
    }
  `}

  &::placeholder {
    color: ${({ theme }) => theme.gray_3};
  }
`;
