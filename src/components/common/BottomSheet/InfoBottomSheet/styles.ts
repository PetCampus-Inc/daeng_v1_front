import { Textarea } from "components/common/Textarea";
import styled from "styled-components";

export const TextAreaBox = styled(Textarea)`
  &.grayArea {
    background-color: ${({ theme }) => theme.colors.gray_5};
    border: 1px solid ${({ theme }) => theme.colors.gray_5};
    padding: 10px 12px;

    ${({ theme }) => theme.typo.label2_14_R};
  }

  &.grayArea:not(:focus):not(:placeholder-shown) {
    border: 1px solid ${({ theme }) => theme.colors.gray_5};
  }
`;

export const Icon = styled.span`
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.yellow_3};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
