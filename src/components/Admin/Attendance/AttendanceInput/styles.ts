import { StyledInputWrapper } from "components/common/Input/styles";
import styled from "styled-components";

export const SearchInput = styled.input`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 12px 18px;
  padding-right: 55px;
  border: none;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.gray_1};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows.card};
  ${({ theme }) => theme.typo.label2_14_R};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_2};
  }
  outline: transparent solid 2px;
  outline-offset: 2px;
  overflow-y: hidden;
  transition:
    border,
    border-color 0.2s ease-out;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

export const SearchInputButton = styled.button`
  all: unset;
  height: 100%;
  padding-right: 1rem;
  aspect-ratio: 1/1;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > .close-icon {
    & > .icon-circle {
      color: ${({ theme }) => theme.colors.primaryColor};
    }

    & > .icon-path {
      color: ${({ theme }) => theme.colors.br_4};
    }
  }

  & > .search-icon {
    color: ${({ theme }) => theme.colors.gray_2};
  }
`;

export const SearchInputContainer = styled(StyledInputWrapper)`
  margin-top: 16px;
`;
