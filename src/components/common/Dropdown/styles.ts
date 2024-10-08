import styled, { CSSProp, css } from "styled-components";

export interface ICustomStyle {
  customStyle?: CSSProp;
}

const RootDefaultStyle = css`
  position: absolute;
  width: max-content;
  top: 0;
  right: 0;
`;

const DropdownListDefaultStyle = css`
  right: 0;
  top: 25px;
`;

export const DropdownRoot = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "customStyle"
})<ICustomStyle>`
  ${({ customStyle }) => customStyle || RootDefaultStyle}
`;

export const StyledDropdownList = styled.ul.withConfig({
  shouldForwardProp: (prop) => prop !== "customStyle"
})<ICustomStyle>`
  min-width: 163px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border: solid 1px ${(props) => props.theme.colors.gray_4};
  box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.13);
  border-radius: 0.4rem;
  z-index: 10;

  ${({ customStyle }) => customStyle || DropdownListDefaultStyle}
`;

export const ItemWrapper = styled.li`
  padding: 10px 12px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_4};

  &:last-child {
    border: none;
  }

  user-select: none;
  cursor: pointer;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.typo.label2_14_R};
  color: ${({ theme }) => theme.colors.gray_2};
  white-space: nowrap;
`;
