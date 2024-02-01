import styled from "styled-components";

export const CheckboxContainer = styled.label`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  vertical-align: top;
  position: relative;
`;

export const HiddenCheckbox = styled.input.attrs({
  type: "checkbox"
})`
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
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  position: relative;
  border-color: ${({ theme }) => theme.gray_4};
  margin-right: 0.5em;

  background: ${({ theme }) => theme.gray_4};

  &[data-checked] {
    background: ${({ theme }) => theme.primaryColor};
    border-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.white};
  }

  &[data-disabled] {
    background: ${({ theme }) => theme.gray_4};
    border: none;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &[data-checked][data-disabled] {
    background: ${({ theme }) => theme.gray_3};
    border-color: ${({ theme }) => theme.gray_3};
  }

  &[data-checked][data-disabled] .checkbox-icon {
    color: ${({ theme }) => theme.white};
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

  &[data-checked] .checkbox-icon {
    color: ${({ theme }) => theme.white};
    animation: checking 200ms linear;
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
  &[data-disabled] {
    color: ${({ theme }) => theme.gray_2};
  }

  ${({ theme }) => theme.typo.label1_16_R};
  color: ${({ theme }) => theme.gray_1};

  margin-inline-start: 0.5rem;
  user-select: none;
`;
