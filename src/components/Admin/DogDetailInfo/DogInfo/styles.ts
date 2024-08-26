import styled from "styled-components";
export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.br_5};
  border-radius: 12px 12px 0 0;
  padding: 16px 16px 22px 24px;
`;

export const TextWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const TagsWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  overflow-x: scroll;
  scrollbar-width: none;
`;
export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  &.row {
    flex-direction: row;
    align-items: center;
  }
`;

export const YellowThickButton = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  border-radius: 90px;
  color: ${({ theme }) => theme.colors.primaryColor};
  ${({ theme }) => theme.typo.caption1_12_B};
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

export const MainBottomContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 16px 32px;
  border: 1px solid ${({ theme }) => theme.colors.br_5};
  border-radius: 0 0 20px 20px;
`;

export const ModalWithTextAreaContent = styled.div`
  padding: 20px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
