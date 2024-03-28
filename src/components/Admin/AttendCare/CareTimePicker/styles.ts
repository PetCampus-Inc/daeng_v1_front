import styled from "styled-components";

export const StyledTimePickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 3;
  position: relative;
`;

export const StyledTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  & > .text {
    ${({ theme }) => theme.typo.label2_14_M};
  }
`;

export const StyledTimeInputWrapper = styled.div<{ $isActive?: boolean }>`
  position: relative;
  display: flex;
  height: 3rem;
  padding: 0.125rem 1.5rem;
  align-items: center;
  gap: 0.625rem;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray_5};

  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.gray_2 : theme.colors.gray_3)};
  border: 1px solid
    ${({ $isActive, theme }) => ($isActive ? theme.colors.gray_5 : theme.colors.gray_4)};

  &:disabled {
    color: ${({ theme }) => theme.colors.gray_3};
    border: 1px solid ${({ theme }) => theme.colors.gray_4};
  }
`;

export const StyledTimeInput = styled.div`
  border: none;
  background-color: transparent;
  text-align: center;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const IncrementButton = styled(StyledButton)`
  right: 0.5rem;
`;

export const DecrementButton = styled(StyledButton)`
  left: 0.5rem;
`;
