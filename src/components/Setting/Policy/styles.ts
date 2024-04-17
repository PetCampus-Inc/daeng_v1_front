import { styled } from "styled-components";

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
  padding: 0 20px;
`;

export const Text = styled.p`
  ${({ theme }) => theme.typo.label2_14_M};
  color: ${({ theme }) => theme.colors.gray_1};
`;
