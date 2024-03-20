import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
`;

export const TitleWrapper = styled.div`
  flex: 3;
`;

export const ToggleWrapper = styled.div`
  flex: 0.8;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
`;

export const TimePickerContainer = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.63rem;
  padding: 1.2rem 1rem;
  margin-top: 0.75rem;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.gray_5};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.gray_1 : theme.colors.gray_3)};

  box-shadow: ${({ $isActive, theme }) => $isActive && theme.shadows.card};

  transition: all 0.2s ease-in-out;
`;

export const TimePickerTitle = styled.p`
  ${({ theme }) => theme.typo.body2_16_B};
`;

export const TimePickerWarper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;

  & > .text {
    ${({ theme }) => theme.typo.body2_16_R};
  }
`;
