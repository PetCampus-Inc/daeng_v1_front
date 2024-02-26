import styled from "styled-components";

export const SelectBox = styled.div`
  display: inline-flex;
  height: 28px;
  padding: 4px 12px;
  align-items: center;
  gap: 3px;

  margin: 14px 0;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ArrowDownButton = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Text = styled.span`
  ${({ theme }) => theme.typo.label2_14_M};
  color: ${({ theme }) => theme.colors.gray_2};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 8px 18px;
  gap: 10px;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typo.body1_18_B};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;
export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
