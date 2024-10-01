import styled from "styled-components";
import { hexToRGBA } from "utils/color";

export const StyledAlbumCheckBox = styled.div`
  display: block;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => hexToRGBA(theme.colors.white, 0.7)};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.gray_4};
  border-radius: 50%;
  transition: all 100ms ease-in-out;

  input {
    display: none;
  }

  &:has(input:checked) {
    background-color: ${({ theme }) => theme.colors.primary_3};
    box-shadow: 0 0 0 3px ${({ theme }) => hexToRGBA(theme.colors.primary_3, 0.5)};
    animation: checking 200ms linear;
  }

  @keyframes checking {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
