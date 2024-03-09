import styled from "styled-components";

export const SendButton = styled.button`
  display: flex;
  gap: 2px;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.yellow_3};
  border-radius: 90px;
  padding: 2px 10px 2px 7px;

  color: ${({ theme }) => theme.colors.primaryColor};
  ${({ theme }) => theme.typo.caption1_12_B};
`;
