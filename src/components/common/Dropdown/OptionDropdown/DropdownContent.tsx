import { useClickOutSide } from "hooks/common/useClickOutSide";
import { type PropsWithChildren, type RefObject, useRef, useContext } from "react";

import { DropdownContext } from "./DropdownContext";

const DropdownContent = ({ children }: PropsWithChildren) => {
  const contentRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const dropdownContext = useContext(DropdownContext);

  useClickOutSide({
    enabled: dropdownContext?.isOpen || !!dropdownContext?.defaultOpen,
    targetRef: contentRef,
    onClickOutside: () => dropdownContext?.changeIsOpen(false)
  });

  return <div ref={contentRef}>{children}</div>;
};

export default DropdownContent;
