import styled, { css } from "styled-components";

export const StyledMainTopWrapper = styled.div`
  width: 100%;
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 4px;
`;

export const StyledTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.body2_16_B};
`;

export const StyledCard = styled.section.withConfig({
  shouldForwardProp: (prop) => !["isShadow"].includes(prop)
})<{ isShadow?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 0.75rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};

  box-shadow: ${({ theme, isShadow }) => isShadow && theme.shadows.card};
`;

export const StyledList = styled.ul`
  width: 100%;
  & > *:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};
  }
`;

export const StyledItemWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 4px;

  &:not(:first-child) {
    padding-top: 8px;
  }

  &:not(:last-child) {
    padding-bottom: 8px;
  }
`;

export const StyledIcon = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
`;

export const StyledItemText = styled.span`
  color: ${({ theme }) => theme.colors.gray_1};
  ${({ theme }) => theme.typo.label2_14_R};
`;
