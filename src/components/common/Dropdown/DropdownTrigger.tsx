import { type ButtonHTMLAttributes, type RefObject, forwardRef, useContext, useRef } from "react";

import { DropdownContext } from "./DropdownContext";

type DropdownTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * DropdownTrigger
 * 자식 엘리먼트에 자동으로 isOpen 상태를 주입합니다.
 * @param props
 * @param props.onClick 클릭 이벤트 핸들러. Dropdown의 toggle 함수와 함께 실행됩니다.
 * @param ref 전달된 ref 객체. 없으면 내부적으로 생성된 ref가 사용됩니다.
 */
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
        {children}
      </span>
    );
  }
);

export default DropdownTrigger;
