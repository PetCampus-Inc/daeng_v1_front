import React from "react";
import { useFormContext } from "react-hook-form";
import CheckIcon from "assets/svg/checkIcon";

import * as S from "./styles";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  isChecked?: boolean;
  isRequired?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "square" | "default";
  id?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  isChecked = false,
  children,
  disabled = false,
  variant = "default",
  isRequired = false,
  id,
  name,
  onChange,
  ...props
}: CheckboxProps) => {
  const { register, setValue } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, e.target.checked, { shouldValidate: true });
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
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        id={id}
        defaultChecked={isChecked}
        disabled={disabled}
        {...register(name, { required: isRequired, onChange: handleChange })}
        {...props}
      />
      <S.Checkbox
        className={isChecked ? "checked" : ""}
        aria-disabled={disabled ? "true" : undefined}
      >
        <CheckIcon className="checkbox-icon" />
      </S.Checkbox>
      <S.LabelText
        className={isChecked ? "checked" : ""}
        aria-disabled={disabled ? "true" : undefined}
      >
        {children}
      </S.LabelText>
    </S.CheckboxContainer>
  );
};

export default Checkbox;
