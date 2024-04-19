import styled from "styled-components";

export const OwnerWaitingListContainer = styled.div`
  width: 100%;
  margin: 67px 0 0;
  position: relative;
`;

export const Text = styled.p`
  margin-top: 45%;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.body2_16_R};
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
