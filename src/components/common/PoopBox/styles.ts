import styled from "styled-components";

export const PoopCardContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 14px;
  margin-top: 8px;
`;

export const PoopCard = styled.button`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  text-align: center;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.gray_2};
  ${({ theme }) => theme.typo.label2_14_R};

  > svg {
    width: 100%;
    border-radius: 10px;
  }
`;
