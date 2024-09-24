import styled from "styled-components";

export const DisconnectionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.red_2};
  color: ${({ theme }) => theme.colors.red_1};
  ${({ theme }) => theme.typo.label2_14_R}
`;
