import { BackgroundButton } from "components/common/Button";
import { styled } from "styled-components";

export const CardContainer = styled.div`
  padding: 20px 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: 4.25rem;

  &.previous {
    p {
      color: ${({ theme }) => theme.colors.gray_2};
    }
    span {
      color: ${({ theme }) => theme.colors.gray_3};
    }
  }
`;

export const CardTitle = styled.p`
  ${({ theme }) => theme.typo.label1_16_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.darkBlack};
  ${({ theme }) => theme.typo.body2_16_B};
  padding-bottom: 0.75rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 12px;
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

  &.previous {
    filter: grayscale(1);
  }
`;

export const ListTitle = styled.span`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_R};
`;

export const YellowThickButton = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  border-radius: 90px;
  color: ${({ theme }) => theme.colors.primaryColor};
  ${({ theme }) => theme.typo.caption1_12_B};
`;

export const DisconnectButton = styled(BackgroundButton)`
  margin-top: 8px;
  padding: 0;
  color: ${({ theme }) => theme.colors.gray_3};
`;
