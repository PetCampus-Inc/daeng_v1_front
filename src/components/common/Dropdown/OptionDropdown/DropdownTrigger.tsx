import { useClickOutSide } from "hooks/common/useClickOutSide";
import { type ButtonHTMLAttributes, type RefObject, forwardRef, useContext, useRef } from "react";

import { DropdownContext } from "./provider";

type DropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  (props: DropdownTriggerProps, ref) => {
    const { children, onClick, ...rest } = props;

    const dropdownContext = useContext(DropdownContext);

    const originalRef = useRef<HTMLButtonElement>(null);

    const dropdownTriggerRef = (ref || originalRef) as RefObject<HTMLButtonElement>;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (dropdownContext) {
        dropdownContext.toggle();
      }
    };

    useClickOutSide({
      enabled: dropdownContext?.isOpen || !!dropdownContext?.defaultOpen,
      targetRef: dropdownTriggerRef,
      onClickOutside: () => dropdownContext?.changeIsOpen(false)
    });

    if (!dropdownContext) {
      throw new Error("DropdownTrigger should be used within a Dropdown");
    }

    return (
      <button ref={dropdownTriggerRef} onClick={handleClick} {...rest}>
        {children}
      </button>
    );
  }
);

export default DropdownTrigger;
