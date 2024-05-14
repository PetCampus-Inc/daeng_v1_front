import { FlexWrapper } from "components/Admin/DogDetailInfo/styles";
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

export const DogDetailInfoPointText = styled.span`
  ${({ theme }) => theme.typo.caption1_12_B};
  color: ${({ theme }) => theme.colors.primaryColor};
`;

export const DogDetailInfoText = styled.div`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label1_16_B};

  &.big {
    ${({ theme }) => theme.typo.body1_18_B};
  }

  &.explanation {
    ${({ theme }) => theme.typo.label2_14_R};
    color: ${({ theme }) => theme.colors.gray_2};
  }
`;

export const TicketInfoCard = styled(FlexWrapper)`
  border-radius: 8px;
  &.deadline {
    position: relative;
    overflow: hidden;

    .deadlineIcon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: ${({ theme }) => theme.colors.red_2};
      color: ${({ theme }) => theme.colors.red_1};
      ${({ theme }) => theme.typo.label2_14_B};
      padding: 8px 10px;
      border-radius: 50px;
    }
  }

  &.deadline::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.black};
    opacity: 0.4;
  }
`;

export const TicketTextBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  &.warning {
    color: ${({ theme }) => theme.colors.red_1};
  }

  &.warning > span {
    background-color: ${({ theme }) => theme.colors.red_2};
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: 0 12px;
  > div:last-child {
    border-bottom: none;
  }
`;

export const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
`;

export const InnerFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FlexText = styled.p`
  &.title {
    display: flex;
    align-items: center;
    gap: 10px;

    ${({ theme }) => theme.typo.body2_16_R};
    color: ${({ theme }) => theme.colors.gray_1};
  }

  &.re-agree {
    display: flex;
    align-items: center;
    ${({ theme }) => theme.typo.caption1_12_R};
    color: ${({ theme }) => theme.colors.primary_3};
  }

  &.date {
    ${({ theme }) => theme.typo.caption1_12_R};
    color: ${({ theme }) => theme.colors.gray_3};
  }
`;
