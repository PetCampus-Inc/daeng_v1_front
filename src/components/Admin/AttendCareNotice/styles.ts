import styled from "styled-components";

export const NoticeItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.body2_16_R};
`;
