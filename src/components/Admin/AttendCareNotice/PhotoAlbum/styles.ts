import styled from "styled-components";

export const SentPhotosText = styled.p`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.body2_16_B};
  padding-bottom: 1.25rem;
`;

export const Container = styled.div`
  padding-top: 1.25rem;
`;
