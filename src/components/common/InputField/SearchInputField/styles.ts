import styled from "styled-components";

export const SearchInputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const SearchInputButton = styled.button`
  all: unset;

  height: 100%;
  width: 17%;
  margin-right: 5%;
  aspect-ratio: 1/1;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & > svg {
    color: ${({ theme }) => theme.colors.gray_2};
  }

  &:disabled > svg {
    color: ${({ theme }) => theme.colors.gray_4};
  }
`;
