import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  width: 100%;
  border-radius: 8px;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  color: ${({ theme }) => theme.colors.primaryColor};
  ${({ theme }) => theme.typo.label2_14_B};
`;
