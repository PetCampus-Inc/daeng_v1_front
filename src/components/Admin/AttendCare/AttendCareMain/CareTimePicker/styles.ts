import styled from "styled-components";

export const StyledTimePickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;

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

export const StyledTimeButton = styled.button`
  position: relative;
  display: flex;
  height: 3rem;
  padding: 0.125rem 1.5rem;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray_5};

  color: ${({ theme }) => theme.colors.gray_2};
  border: 1px solid ${({ theme }) => theme.colors.gray_5};

  &:disabled {
    color: ${({ theme }) => theme.colors.gray_3};
    border: 1px solid ${({ theme }) => theme.colors.gray_4};
  }
`;
