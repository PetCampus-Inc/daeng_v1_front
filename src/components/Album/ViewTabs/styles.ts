import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 28px;
    height: 28px;
    color: ${({ theme }) => theme.colors.gray_4};
    transition: color 0.3s ease-in-out;
  }

  &.active > svg {
    color: ${({ theme }) => theme.colors.gray_2};
  }
`;
