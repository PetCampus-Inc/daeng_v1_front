import styled from "styled-components";

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 8px;

  user-select: none;
`;

export const ListItem = styled.li`
  display: flex;
  padding: 18px 0;
  align-items: center;
  gap: 10px;

  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_1};

  &.active {
    ${({ theme }) => theme.typo.label1_16_B};
    color: ${({ theme }) => theme.colors.primaryColor};
  }

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_5};

  &:last-child {
    border: none;
  }
`;
