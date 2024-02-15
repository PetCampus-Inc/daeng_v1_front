import styled from "styled-components";

export const Container = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 8.1px;
  width: 100%;
`;

export const Caption = styled.p`
  color: ${({ theme }) => theme.colors.gray_3};
  font-weight: 400;
  font-size: 0.75rem;
  user-select: none;
`;

export const RadioContainer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 8px;
`;

export const StyledInput = styled.input`
  display: none;
  &:checked + label {
    background-color: ${({ theme }) => theme.colors.br_4};
    border: 1px solid ${({ theme }) => theme.colors.br_3};
    color: ${({ theme }) => theme.colors.primaryColor};
  }
  &:disabled + label {
    background-color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.typo.body2_16_R};
    color: ${({ theme }) => theme.colors.gray_4};
    border: 1px solid ${({ theme }) => theme.colors.gray_5};
  }
`;

export const StyledLabel = styled.label`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 12px 8px;
  width: 100%;
  border-radius: 8px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  user-select: none;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_4};
  color: ${({ theme }) => theme.colors.gray_3};

  &.policyPage {
    background-color: ${({ theme }) => theme.colors.gray_5};
    border: transparent;
    color: ${({ theme }) => theme.colors.gray_2};
  }

  &.disabled {
    background-color: ${({ theme }) => theme.colors.gray_5};
    border: 1px solid ${({ theme }) => theme.colors.gray_4};
    color: ${({ theme }) => theme.colors.gray_4};
  }
`;

export const RadioGroupContainer = styled.div`
  display: flex;
  gap: 12px;
`;

export const RadioWrapper = styled.div`
  position: relative;
  flex: 1;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 2;
`;
