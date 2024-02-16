import styled from "styled-components";

export const Container = styled.button<{ $isUsed: boolean; $isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 19px 20px;
  background-color: ${(props) =>
    props.$isSelected ? props.theme.colors.yellow_3 : props.theme.colors.white};
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.$isUsed ? props.theme.colors.br_4 : props.theme.colors.gray_4)};
  box-shadow: ${({ theme }) => theme.shadows.card};
  .skeleton {
    background-color: ${({ theme }) => theme.colors.gray_4};
  }

  transition: background-color 0.3s;
`;

export const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

export const TextWrapper = styled.div`
  text-align: left;
  margin-left: 16px;
  gap: 2px;
`;

export const Title = styled.p`
  ${({ theme }) => theme.typo.body2_16_B};
  color: ${({ theme }) => theme.colors.gray_1};
  white-space: nowrap;
`;

export const MiddleText = styled.p`
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_2};
  white-space: nowrap;
`;

export const Date = styled.p`
  ${({ theme }) => theme.typo.caption1_12_R};
  color: ${({ theme }) => theme.colors.gray_3};
  white-space: nowrap;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
