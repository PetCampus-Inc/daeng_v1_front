import styled, { type DefaultTheme, css } from "styled-components";

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["pt", "pb", "ph", "pr", "pl"].includes(prop)
})<{
  pt?: number;
  pb?: number;
  ph?: number;
  pr?: number;
  pl?: number;
}>`
  display: flex;
  padding-top: ${({ pt }) => (pt ? pt : 0)}rem;
  padding-bottom: ${({ pb }) => (pb ? pb : 0)}rem;
  padding-left: ${({ pl, ph }) => (pl ? pl : ph ? ph : 0)}rem;
  padding-right: ${({ pr, ph }) => (pr ? pr : ph ? ph : 0)}rem;
  align-items: center;
  gap: 10px;

  background-color: transparent;
  border: none;
  overflow: hidden;
  outline: none;
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_R};
`;

export const StyledButtonAddon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.gray_3};
`;
