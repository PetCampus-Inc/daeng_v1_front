import { PropsWithChildren, RefObject, memo, useRef } from "react";

import DropdownList from "./DropdownList";
import DropdownOption from "./DropdownOption";
import DropdownTrigger from "./DropdownTrigger";
import { DropdownProvider } from "./provider";
import { DropdownRoot } from "./styles";

interface OptionDropdownProps {
  defaultOpen: boolean;
  onSelect?: (index: number) => void;
}

interface IDropdown
  extends React.MemoExoticComponent<React.FC<PropsWithChildren<OptionDropdownProps>>> {
  Trigger: typeof DropdownTrigger;
  List: typeof DropdownList;
  Option: typeof DropdownOption;
}

const OptionDropdownBase = ({
  children,
  defaultOpen,
  onSelect
}: PropsWithChildren<OptionDropdownProps>) => {
  const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  return (
    <DropdownProvider defaultOpen={defaultOpen} onSelect={onSelect}>
      <DropdownRoot ref={dropdownRef}>{children}</DropdownRoot>
    </DropdownProvider>
  );
};

const Dropdown = memo(OptionDropdownBase) as IDropdown;

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Option = DropdownOption;

export default Dropdown;
