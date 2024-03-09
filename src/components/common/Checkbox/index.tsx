import CheckIcon from "assets/svg/checkIcon";
import React, { type ChangeEvent } from "react";

import * as S from "./styles";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  isChecked?: boolean;
  disabled?: boolean;
  variant?: "fill" | "outline" | "default";
  id?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Checkbox = React.forwardRef(
  (
    {
      isChecked = false,
      disabled = false,
      variant = "default",
      id,
      name,
      onChange,
      label,
      ...props
    }: CheckboxProps,
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <S.CheckboxContainer
        htmlFor={id}
        variant={variant}
        className={isChecked ? "checked" : ""}
        aria-disabled={disabled ? "true" : undefined}
      >
        <S.HiddenCheckbox
          type="checkbox"
          ref={ref as React.RefObject<HTMLInputElement>}
          id={id}
          name={name}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        <S.Checkbox
          className={isChecked ? "checked" : ""}
          aria-disabled={disabled ? "true" : undefined}
          variant={variant}
        >
          <CheckIcon className={`checkbox-icon ${variant}`} />
        </S.Checkbox>
        {label && (
          <S.LabelText
            className={isChecked ? "checked" : ""}
            aria-disabled={disabled ? "true" : undefined}
          >
            {label}
          </S.LabelText>
        )}
      </S.CheckboxContainer>
    );
  }
);

export default Checkbox;
