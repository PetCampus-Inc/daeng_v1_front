import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const CardInnerBox = styled.div`
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

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.card};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TableHeader = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 8px 8px 0 0;
  ${({ theme }) => theme.typo.label2_14_M};
  background-color: ${({ theme }) => theme.colors.gray_5};
  color: ${({ theme }) => theme.colors.gray_1};
`;

export const TableRow = styled.div`
  display: flex;
  padding-block: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;

  &:first-child {
    flex: 3;
    margin-left: -12px;
    border-right: 1px solid ${({ theme }) => theme.colors.gray_4};
  }

  &:last-child {
    flex: 4;
    margin-right: -12px;
  }
`;
