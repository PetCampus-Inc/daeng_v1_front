import {
  type ButtonHTMLAttributes,
  type RefObject,
  forwardRef,
  useContext,
  useRef,
  Children,
  cloneElement,
  isValidElement,
  ReactElement
} from "react";

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
        aria-expanded={dropdownContext.isOpen ? "true" : "false"}
        {...rest}
        aria-label="펼치기"
        role="button"
      >
        {Children.map(children, (child) => {
          return isValidElement(child)
            ? cloneElement(child as ReactElement, {
                isOpen: dropdownContext?.isOpen
              })
            : child;
        })}
      </span>
    );
  }
);

export default DropdownTrigger;
