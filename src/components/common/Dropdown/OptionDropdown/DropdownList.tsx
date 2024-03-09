import {
  Children,
  type PropsWithChildren,
  useContext,
  cloneElement,
  type ReactElement
} from "react";

import { DropdownContext } from "./provider";
import { StyledDropdownList } from "./styles";

const DropdownList = ({ children }: PropsWithChildren) => {
  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) {
    throw new Error("DropdownList should be used within a Dropdown");
  }
  return (
    <>
      {dropdownContext?.isOpen && (
        <StyledDropdownList role="menu">
          {Children.map(children, (child, idx) => {
            return cloneElement(child as ReactElement, {
              handleChange: () => {
                dropdownContext.changeCurrent(idx);
                dropdownContext.onSelect?.(idx);
              },
              isSelected: dropdownContext.current === idx
            });
          })}
        </StyledDropdownList>
      )}
    </>
  );
};

export default DropdownList;