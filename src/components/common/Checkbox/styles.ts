import styled from "styled-components";

export const CheckboxContainer = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  position: relative;
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
    box-shadow: 0 0 0 2px ${({ theme }) => theme.br_3};
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
  margin-right: 0.5em;

  border: 2px solid ${({ theme }) => theme.gray_4};
  border-radius: 50%;

  background: ${({ theme }) => theme.gray_4};

  &.checked {
    background: ${({ theme }) => theme.primaryColor};
    border-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.white};
  }

  &[aria-disabled="true"] {
    background: ${({ theme }) => theme.gray_4};
    border: none;
    cursor: not-allowed;
    opacity: 0.6;
    tabindex: -1;
  }

  &[aria-disabled="true"].checked {
    background: ${({ theme }) => theme.gray_3};
    border-color: ${({ theme }) => theme.gray_3};
  }

  .checkbox-icon {
    width: 1em;
    height: 1em;
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: ${({ theme }) => theme.gray_3};
    vertical-align: middle;
    font-size: 1rem;
    transition-property: transform;
    animation: none;
  }

  &.checked .checkbox-icon {
    color: ${({ theme }) => theme.white};
    animation: checking 200ms linear;
  }

  &[aria-disabled="disabled"] .checkbox-icon,
  &[aria-disabled="disabled"].checked .checkbox-icon {
    color: ${({ theme }) => theme.white};
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
  &[aria-disabled="true"] {
    color: ${({ theme }) => theme.gray_2};
    tabindex: -1;
  }

  ${({ theme }) => theme.typo.label1_16_R};
  color: ${({ theme }) => theme.gray_1};

  margin-inline-start: 0.5rem;
  user-select: none;
`;
