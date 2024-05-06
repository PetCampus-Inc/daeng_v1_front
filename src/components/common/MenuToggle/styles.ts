import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.br_5};
  color: ${({ theme }) => theme.colors.br_2};
  margin: 2rem 0;
`;
