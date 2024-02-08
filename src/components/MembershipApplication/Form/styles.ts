import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 14px;
`;

export const Stack = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Caption = styled.p`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_3};
`;
