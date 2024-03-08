import styled from "styled-components";

export const DropdownRoot = styled.div`
  position: absolute;
  width: max-content;
  top: 0;
  right: 0;
`;

export const StyledDropdownList = styled.ul`
  min-width: 163px;
  position: absolute;
  background-color: white;
  border: solid 1px ${(props) => props.theme.colors.gray_4};
  box-shadow: 0px 5px 15px 5px rgba(0, 0, 0, 0.13);
  border-radius: 0.4rem;
  right: 0;
  top: 25px;
  z-index: 10;
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
`;
