import styled from "styled-components";

export const ToggleBox = styled.div`
  min-width: 50px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  outline: none;
  letter-spacing: 0;
`;

export const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  border-radius: 50%;
`;

export const Item = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isChecked"
})<{ isChecked?: boolean }>`
  align-self: center;
  z-index: 1;
  pointer-events: none;
  padding: 1px 12px;
  ${({ theme }) => theme.typo.caption1_12_R};
  border: 1px solid ${({ theme }) => theme.colors.br_4};

  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.primaryColor : theme.colors.br_4)};
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.br_4 : theme.colors.transparent};

  transition:
    color 0.2s ease-out,
    background-color 0.2s ease-out;
`;

export const LeftItem = styled(Item)`
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;

  /* readOnly 스타일을 LeftItem에만 적용 */
  input[readonly] ~ & {
    color: ${({ theme }) => theme.colors.gray_4};
    background-color: ${({ theme }) => theme.colors.gray_5};
    border-color: ${({ theme }) => theme.colors.gray_4};
    cursor: not-allowed;
  }
`;

export const RightItem = styled(Item)`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;
