import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  padding: 1px 12px;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.br_4};
  color: ${({ theme }) => theme.colors.primaryColor};
  ${({ theme }) => theme.typo.label2_14_M};
`;

export const StyledButtonAddon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
