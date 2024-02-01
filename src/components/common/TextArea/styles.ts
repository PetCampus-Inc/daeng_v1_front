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

  overflow-y: hidden;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.gray_3};
  }
`;
