import styled from "styled-components";

export const NoticeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 6% 5% 89px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px -8px 15px rgba(0, 0, 0, 0.04);
  z-index: 2;
`;

export const NoticeItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.label1_16_B};
`;

export const NoticeContent = styled.p`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label1_16_R};
`;

export const PoopCardContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 14px;
  margin-top: 8px;
`;

export const PoopCard = styled.div`
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
