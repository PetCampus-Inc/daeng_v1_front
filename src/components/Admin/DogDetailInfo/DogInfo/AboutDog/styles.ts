import styled from "styled-components";

export const MainTopWrapper = styled.div`
  width: 100%;
`;

export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.br_5};
  border-radius: 12px 12px 0 0;
  padding: 16px 16px 24px 25px;
`;

export const Image = styled.img`
  border-radius: 50%;
  width: 5.5rem;
  height: 5.5rem;
  object-fit: cover;
`;

export const InfoWrapper = styled.div`
  width: 100%;
`;

export const InfoTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Text = styled.div`
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.label1_16_B};

  &.big {
    ${({ theme }) => theme.typo.body1_18_B};
  }

  &.explanation {
    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_2};
  }
`;

export const DogSizeBadge = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primaryColor};
  padding: 4px 10px;
  border-radius: 900px;

  ${({ theme }) => theme.typo.caption1_12_R};
`;

export const InfoIcons = styled.div`
  display: flex;
  justify-content: start;
  gap: 8px;
  margin-top: 3%;
  margin-bottom: 5%;
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_R};
`;

export const MainBottomWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 0 16px 32px;
  border: 1px solid ${({ theme }) => theme.colors.br_5};
  border-radius: 0 0 20px 20px;
`;

export const TagsWrapper = styled.div`
  display: flex;
  justify-content: start;
  gap: 8px;
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  overflow-x: scroll;
  scrollbar-width: none;
`;

export const DogDetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
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
