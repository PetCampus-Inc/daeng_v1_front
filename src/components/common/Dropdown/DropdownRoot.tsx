import { PropsWithChildren, RefObject, memo, useRef } from "react";

import DropdownContent from "./DropdownContent";
import { DropdownProvider } from "./DropdownContext";
import DropdownList from "./DropdownList";
import DropdownOption from "./DropdownOption";
import DropdownTrigger from "./DropdownTrigger";
import { DropdownRoot, type ICustomStyle } from "./styles";

interface OptionDropdownProps extends ICustomStyle {
  defaultOpen?: boolean;
  onSelect?: (index: number) => void;
}

interface IDropdown
  extends React.MemoExoticComponent<React.FC<PropsWithChildren<OptionDropdownProps>>> {
  Trigger: typeof DropdownTrigger;
  List: typeof DropdownList;
  Option: typeof DropdownOption;
  Content: typeof DropdownContent;
}

const OptionDropdownBase = ({
  children,
  defaultOpen = false,
  onSelect,
  customStyle
}: PropsWithChildren<OptionDropdownProps>) => {
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  return (
    <DropdownProvider defaultOpen={defaultOpen} onSelect={onSelect}>
      <DropdownRoot ref={dropdownRef} customStyle={customStyle}>
        {children}
      </DropdownRoot>
    </DropdownProvider>
  );
};

export const Dropdown = memo(OptionDropdownBase) as IDropdown;

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Option = DropdownOption;
Dropdown.Content = DropdownContent;
