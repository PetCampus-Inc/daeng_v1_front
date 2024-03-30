import styled from "styled-components";

export const MainTopWrapper = styled.div`
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 4px;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.body2_16_B};
`;

export const ButtonWrapper = styled.div``;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};

  & > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  }
`;

export const InfoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 8px;
  gap: 4px;
`;

export const IconWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
`;

export const ListTitle = styled.span`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_R};
`;
