import styled from "styled-components";

export const ExclamationMark = styled.div`
  position: absolute;
  right: -2rem;
  bottom: 5.8125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 236px;
  height: 236px;
  background-color: ${({ theme }) => theme.colors.gray_5};
  z-index: -1;
`;

export const CheckboxWrapper = styled.div`
  & > div > label > span:first-of-type {
    flex-shrink: 0;
  }
`;
