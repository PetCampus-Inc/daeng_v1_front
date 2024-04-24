import styled from "styled-components";

export const PaddingContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NoticeItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.body2_16_R};
`;
