import CheckIcon from "assets/svg/check-icon";
import React, { type ChangeEvent } from "react";

import { CheckboxContainer, HiddenCheckbox, LabelText, StyledCheckbox } from "./styles";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  isChecked?: boolean;
  variant?: "fill" | "outline" | "default";
  id?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Checkbox = React.forwardRef(
  (
    { isChecked = false, variant = "default", id, name, onChange, label, ...props }: CheckboxProps,
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <CheckboxContainer
        htmlFor={id}
        variant={variant}
        className={isChecked ? "checked" : ""}
        aria-disabled={props.disabled ? "true" : undefined}
      >
        <HiddenCheckbox
          type="checkbox"
          ref={ref as React.RefObject<HTMLInputElement>}
          id={id}
          name={name}
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />
        <StyledCheckbox
          className={isChecked ? "checked" : ""}
          aria-disabled={props.disabled ? "true" : undefined}
          variant={variant}
        >
          <CheckIcon className={`checkbox-icon ${variant}`} />
        </StyledCheckbox>
        {label && (
          <LabelText
            className={isChecked ? "checked" : ""}
            aria-disabled={props.disabled ? "true" : undefined}
          >
            {label}
          </LabelText>
        )}
      </CheckboxContainer>
    );
  }
);

export default Checkbox;
