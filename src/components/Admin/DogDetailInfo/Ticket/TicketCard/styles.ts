import { Box } from "components/common";
import styled from "styled-components";

export const Container = styled(Box)`
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 8px;
`;

export const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 20px 16px;

  &.upper {
    border-radius: 8px 8px 0 0;
    background-color: ${({ theme }) => theme.colors.yellow_3};
  }
  &.lower {
    border-radius: 0 0 8px 8px;
    background-color: ${({ theme }) => theme.colors.white};
    gap: 8px;
  }
`;

export const BlackCover = styled.button`
  position: absolute;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
`;

export const RenewButton = styled.span`
  background-color: ${({ theme }) => theme.colors.red_2};
  color: ${({ theme }) => theme.colors.red_1};
  ${({ theme }) => theme.typo.label2_14_B};
  padding: 6px 21px;
  border-radius: 28px;
`;
