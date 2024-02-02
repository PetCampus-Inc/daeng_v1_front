import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.typo.label1_16_R}
`;
