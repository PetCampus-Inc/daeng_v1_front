import { useController, UseControllerProps } from "react-hook-form";
import CheckIcon from "assets/svg/checkIcon";

import * as S from "./styles";
import { ChangeEvent } from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue">,
    UseControllerProps {
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
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  isChecked = false,
  value,
  children,
  disabled = false,
  variant = "default",
  isRequired = false,
  id,
  onChange,
  ...useControllerProps
}: CheckboxProps) => {
  const { field } = useController(useControllerProps);
  const { onChange: fieldOnChange, ...restFieldProps } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fieldOnChange(e);

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
        checked={field.value ?? false}
        disabled={disabled}
        onChange={handleChange}
        {...restFieldProps}
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
