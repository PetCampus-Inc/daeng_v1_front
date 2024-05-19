import styled from "styled-components";

export const NoNoticeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15.5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray_5};
`;

export const TextIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.label2_14_R};
`;
