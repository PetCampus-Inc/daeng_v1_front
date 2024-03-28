import React, { PropsWithChildren, useContext } from "react";

import { DropdownContext } from "./DropdownContext";
import { Item, ItemWrapper } from "./styles";

interface DropdownOptionProps {
  onClick?: (e?: React.MouseEvent) => void;
  handleChange?: () => void;
  isSelected?: boolean;
}

const DropdownOption = ({
  children,
  onClick,
  handleChange
}: PropsWithChildren<DropdownOptionProps>) => {
  const dropdownContext = useContext(DropdownContext);

  if (!dropdownContext) {
    throw new Error("DropdownOption should be used within a Dropdown");
  }

  return (
    <ItemWrapper
      onClick={(e) => {
        e.stopPropagation();
        handleChange?.();
        onClick?.(e);
        dropdownContext.changeIsOpen(false);
      }}
    >
      <Item>{children}</Item>
    </ItemWrapper>
  );
};

export default DropdownOption;
