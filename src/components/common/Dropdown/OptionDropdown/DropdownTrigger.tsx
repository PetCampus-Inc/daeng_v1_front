import { useClickOutSide } from "hooks/common/useClickOutSide";
import { type ButtonHTMLAttributes, type RefObject, forwardRef, useContext, useRef } from "react";

import { DropdownContext } from "./DropdownContext";

type DropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  (props: DropdownTriggerProps, ref) => {
    const { children, onClick, ...rest } = props;

    const dropdownContext = useContext(DropdownContext);

    const originalRef = useRef<HTMLButtonElement>(null);

    const dropdownTriggerRef = (ref || originalRef) as RefObject<HTMLButtonElement>;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClick?.(event);
      if (dropdownContext) {
        dropdownContext.toggle();
      }
    };

    if (!dropdownContext) {
      throw new Error("DropdownTrigger should be used within a Dropdown");
    }

    return (
      <span
        ref={dropdownTriggerRef}
        onClick={handleClick}
        {...rest}
        aria-label="펼치기"
        role="button"
      >
        {children}
      </span>
    );
  }
);

export default DropdownTrigger;
