import styled from "styled-components";
import { remCalc } from "utils/calculator";

export const ListContent = styled.div`
  display: flex;
  flex-wrap: wrap; // column 수 조절 필요함

  gap: 16px 18px;
  justify-content: space-evenly;

  margin-top: ${remCalc(20)};
`;
export const DogItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  &.active {
    & > .dog-avatar {
      box-shadow: ${({ theme }) => theme.colors.primary_4} 0px 0px 0px 4px;
    }

    & > .dog-name {
      ${({ theme }) => theme.typo.body2_16_B};
    }
  }
`;

export const DogAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 68px;
  height: 68px;

  border-radius: 20px;
  overflow: hidden;

  background-color: ${({ theme }) => theme.colors.gray_5};
`;

export const Name = styled.span`
  ${({ theme }) => theme.typo.body2_16_R};
  color: ${({ theme }) => theme.colors.gray_1};

  width: 68px; /* 아바타 크기와 동일 */

  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
`;
