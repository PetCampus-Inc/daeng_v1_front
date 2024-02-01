import styled from "styled-components";

export const Text = styled.p`
  ${({ theme }) => theme.typo.caption1};
  color: ${({ theme }) => theme.gray_3};
`;
