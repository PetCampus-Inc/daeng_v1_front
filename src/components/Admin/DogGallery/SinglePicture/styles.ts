import { styled } from "styled-components";

export const Container = styled.label`
  position: relative;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 200ms ease-in-out;

  &[data-edit-mode="false"] {
    &:active {
      transform: scale(0.95);
      border-radius: 1rem;
      opacity: 0.8;
    }
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0;
  }

  &:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.primary_2};

    &:before {
      opacity: 0.3;
    }
  }
`;

export const CheckBoxWrap = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
`;

export const VideoIconWrap = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;

  svg {
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.black});
  }
`;
