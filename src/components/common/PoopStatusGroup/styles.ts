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

  gap: 0.4rem;

  &:has(input[type="radio"]:checked) {
    span {
      color: ${({ theme }) => theme.colors.primaryColor};
    }
  }
`;

export const PoopStatusRadio = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.gray_4};
  transition: all 140ms ease-in-out;

  &:has(input[type="radio"]:checked) {
    background-color: ${({ theme }) => theme.colors.yellow_3};

    svg {
      color: ${({ color }) => color};
    }
  }

  &:active {
    scale: 0.95;
    opacity: 0.9;
  }

  svg {
    width: 100%;
    color: ${({ theme }) => theme.colors.gray_3};
  }

  input {
    display: none;
  }
`;
