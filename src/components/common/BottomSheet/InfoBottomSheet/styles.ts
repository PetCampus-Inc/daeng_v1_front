import TextArea from "components/common/TextArea";
import styled from "styled-components";

export const TextAreaBox = styled(TextArea)`
  background-color: ${({ theme }) => theme.colors.gray_5};
  border: 1px solid ${({ theme }) => theme.colors.gray_5};
  padding: 10px 12px;
  height: 140px;

  ${({ theme }) => theme.typo.label2_14_R};
  &:not(:focus):not(:placeholder-shown) {
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
