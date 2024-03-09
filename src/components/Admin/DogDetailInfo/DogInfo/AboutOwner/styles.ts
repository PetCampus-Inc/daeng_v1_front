import styled from "styled-components";

export const Wrapper = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 12px;
`;

export const UpperContainer = styled.div`
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-radius: 12px 12px 0 0;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: ${({ theme }) => theme.colors.white};
  padding: 12px;

  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  border-top: none;
  border-radius: 0 0 12px 12px;

  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.label2_14_R};
`;
