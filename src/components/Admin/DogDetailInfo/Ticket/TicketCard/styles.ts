import { Box } from "components/common";
import styled from "styled-components";

export const Container = styled(Box)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
  filter: ${({ grayScaleMode }) => (grayScaleMode ? "grayscale(100%)" : "none")};
`;

export const InnerBox = styled.div`
  display: flex;
  flex-direction: column;

  &.upper {
    padding: 12px 20px 16px;
    background-color: ${({ theme }) => theme.colors.yellow_3};
  }

  &.lower {
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.colors.white};

    gap: 8px;
  }
`;

export const Dimmed = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: grayscale(100%);
`;

export const RenewButton = styled.span`
  background-color: ${({ theme }) => theme.colors.red_2};
  color: ${({ theme }) => theme.colors.red_1};
  ${({ theme }) => theme.typo.label2_14_B};
  padding: 6px 21px;
  border-radius: 28px;
`;
