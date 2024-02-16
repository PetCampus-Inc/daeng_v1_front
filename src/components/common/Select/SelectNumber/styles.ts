import { styled } from "styled-components";

export const Container = styled.div`
  position: relative;
`;

export const InputWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Button = styled.button`
  height: 100%;
  width: 17%;
  margin-right: 5%;
  aspect-ratio: 1/1;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > svg {
    color: ${({ theme }) => theme.colors.gray_2};
  }

  &:disabled > svg {
    color: ${({ theme }) => theme.colors.gray_4};
  }
`;
