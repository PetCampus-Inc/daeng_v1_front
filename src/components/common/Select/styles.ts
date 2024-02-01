import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8.1px;
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Caption = styled.p`
  color: ${({ theme }) => theme.gray_3};
  font-weight: 400;
  font-size: 0.75rem;
`;

export const RadioContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledInput = styled.input`
  display: none;
  &:checked + label {
    background-color: ${({ theme }) => theme.br_4};
    border: 1px solid ${({ theme }) => theme.br_3};
    color: ${({ theme }) => theme.primaryColor};
  }
  &:disabled + label {
    background-color: ${({ theme }) => theme.white};
    ${({ theme }) => theme.typo.body2_16_R};
    color: ${({ theme }) => theme.gray_4};
    border: transparent;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  height: 49px;
  width: 100%;
  border-radius: 8px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.gray_5};
  border: 1px solid ${({ theme }) => theme.gray_5};
  color: ${({ theme }) => theme.gray_2};
`;
