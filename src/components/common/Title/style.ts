import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  ${({ theme }) => theme.typo.label1_16_R}
`;

export const Container = styled.div`
  display: flex;
  gap: 4px;
`;
