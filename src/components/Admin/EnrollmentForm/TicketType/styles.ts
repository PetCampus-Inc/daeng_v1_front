import styled from "styled-components";

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_5};
    border-radius: 50%;
  }

  transition: background-color 0.2s ease-in-out;
`;

export const ConfirmButton = styled.button`
  display: flex;
  width: 100%;
  padding: 11px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.typo.label1_16_B};
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0px;
  gap: 4px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.br_4};
  color: ${({ theme }) => theme.colors.primaryColor};

  ${({ theme }) => theme.typo.caption1_12_R};
  line-height: 0;

  & > svg {
    color: ${({ theme }) => theme.colors.br_2};
  }

  &:disabled {
    border: 1px solid ${({ theme }) => theme.colors.gray_4};
    background-color: ${({ theme }) => theme.colors.gray_5};

    color: ${({ theme }) => theme.colors.gray_4};
  }

  &:disabled > svg {
    color: ${({ theme }) => theme.colors.gray_3};
  }

  transition: background-color 0.2s ease-in-out;
`;
