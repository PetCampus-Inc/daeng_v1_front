import styled from "styled-components";

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.span`
  ${({ theme }) => theme.typo.title2_20_B};
  color: ${({ theme }) => theme.colors.darkBlack};
`;

export const SubTitle = styled.p`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Container = styled.div`
  margin: 44px 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

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
