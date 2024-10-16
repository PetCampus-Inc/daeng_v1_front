import styled from "styled-components";

export const PoopStatusFieldSet = styled.fieldset`
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
`;

export const PoopStatusRadioWrap = styled.label`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  gap: 0.3rem;

  &:has(input[type="radio"]:checked) {
    span {
      color: ${({ theme }) => theme.colors.primaryColor};
    }
  }
`;

export const PoopStatusRadio = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "color"
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.4rem;
  transition: all 140ms ease-in-out;

  background-color: ${({ theme }) => theme.colors.gray_4};

  svg {
    width: 100%;
    color: ${({ theme }) => theme.colors.gray_3};
  }

  &:active {
    scale: 0.95;
    opacity: 0.9;
  }

  &:has(input[type="radio"]:disabled) {
    background-color: ${({ theme }) => theme.colors.gray_5};
    cursor: not-allowed;

    svg {
      color: ${({ theme }) => theme.colors.gray_4};
    }

    &:active {
      scale: 1;
      opacity: 1;
    }
  }

  &:has(input[type="radio"]:checked) {
    background-color: ${({ theme }) => theme.colors.yellow_3};

    svg {
      color: ${({ color }) => color};
    }
  }

  input {
    display: none;
  }
`;
