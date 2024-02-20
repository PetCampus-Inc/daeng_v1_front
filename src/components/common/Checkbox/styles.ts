import styled, { DefaultTheme, css } from "styled-components";
import type { CheckboxProps } from "./index";

const variantStyles = (theme: DefaultTheme) => ({
  square: css`
    padding: 14px;
    border-radius: 12px;
    background: ${theme.colors.gray_5};
    &.checked {
      background: ${theme.colors.br_4};
    }
  `
});

export const CheckboxContainer = styled.label.withConfig({
  shouldForwardProp: (prop) => prop !== "variant"
})<{ variant: CheckboxProps["variant"] }>`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  position: relative;
  gap: 11px;

  transition: background-color 0.2s ease;
  ${({ theme, variant }) => variant === "square" && variantStyles(theme)[variant]};
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

  &:focus-visible + span {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.br_2};
  }
`;

export const Checkbox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  user-select: none;
  width: 20px;
  height: 20px;
  position: relative;

  border: 2px solid ${({ theme }) => theme.colors.gray_4};
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.gray_4};

  &.checked {
    background: ${({ theme }) => theme.colors.primaryColor};
    border-color: ${({ theme }) => theme.colors.primaryColor};
    color: ${({ theme }) => theme.colors.white};
  }

  &[aria-disabled="true"] {
    background: ${({ theme }) => theme.colors.gray_4};
    border: none;
    cursor: not-allowed;
    opacity: 0.6;
    tabindex: -1;
  }

  &[aria-disabled="true"].checked {
    background: ${({ theme }) => theme.colors.gray_3};
    border-color: ${({ theme }) => theme.colors.gray_3};
  }

  & > .checkbox-icon {
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.gray_3};
    vertical-align: middle;
    font-size: 1rem;
    transition-property: transform;
    animation: none;
  }

  &.checked > .checkbox-icon {
    color: ${({ theme }) => theme.colors.white};
    animation: checking 200ms linear;
  }

  &[aria-disabled="disabled"] .checkbox-icon,
  &[aria-disabled="disabled"].checked .checkbox-icon {
    color: ${({ theme }) => theme.colors.white};
  }

  @keyframes checking {
    0% {
      opacity: 0;
      stroke-dashoffset: 16;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      stroke-dashoffset: 0;
      transform: scale(1);
    }
  }
`;

export const LabelText = styled.span`
  &.checked {
    color: ${({ theme }) => theme.colors.gray_1};
  }

  &[aria-disabled="true"] {
    color: ${({ theme }) => theme.colors.gray_4};
    tabindex: -1;
  }

  ${({ theme }) => theme.typo.label1_16_R};
  color: ${({ theme }) => theme.colors.gray_1};

  user-select: none;
`;
