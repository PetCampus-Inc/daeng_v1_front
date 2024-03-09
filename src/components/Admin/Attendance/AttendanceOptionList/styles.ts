import { styled } from "styled-components";

export const IconWrapper = styled.span`
  position: absolute;
  right: 6px;
  top: 3px;
  border-radius: 50%;

  color: ${({ theme }) => theme.colors.gray_2};
`;
