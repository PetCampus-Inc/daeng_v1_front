import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.typo.label1_16_R}
`;
