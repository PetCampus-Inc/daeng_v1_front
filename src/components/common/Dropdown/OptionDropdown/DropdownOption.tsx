import React, { PropsWithChildren, useContext } from "react";

import { DropdownContext } from "./provider";
import { Item, ItemWrapper } from "./styles";

interface DropdownOptionProps {
  onClick?: () => void;
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
        e.preventDefault();
        handleChange?.();
        onClick?.();
      }}
    >
      <Item>{children}</Item>
    </ItemWrapper>
  );
};

export default DropdownOption;
