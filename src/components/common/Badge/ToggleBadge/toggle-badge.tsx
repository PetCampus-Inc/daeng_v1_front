import React, { forwardRef, type ChangeEvent } from "react";

import { HiddenCheckbox, LeftItem, RightItem, ToggleBox } from "./styles";

export interface ToggleBadgeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange?: (checked: boolean) => void;
}

export const ToggleBadge = forwardRef<HTMLInputElement, ToggleBadgeProps>(
  ({ onChange, value, ...props }, ref) => {
    const checked = value === undefined ? true : !!value;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (props.readOnly) {
        e.preventDefault();
        return;
      }
      onChange?.(e.target.checked);
    };

    return (
      <ToggleBox>
        <HiddenCheckbox
          {...props}
          type="checkbox"
          onChange={handleChange}
          checked={checked}
          ref={ref}
        />
        <LeftItem isChecked={!checked}>선택</LeftItem>
        <RightItem isChecked={checked}>필수</RightItem>
      </ToggleBox>
    );
  }
);

ToggleBadge.displayName = "ToggleBadge";
