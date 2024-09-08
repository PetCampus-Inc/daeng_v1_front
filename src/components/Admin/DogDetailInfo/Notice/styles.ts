import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 0 12px;
  > div:last-child {
    border-bottom: none;
  }
`;
