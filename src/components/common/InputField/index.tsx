import React from "react";
import { Control, UseControllerProps, useController } from "react-hook-form";

import * as S from "./styles";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name" | "disabled">,
    UseControllerProps {
  control: Control;
}

const InputField = ({
  control,
  name,
  rules,
  defaultValue,
  placeholder,
  disabled = false,
  ...inputProps
}: InputFieldProps) => {
  const { field } = useController({ control, name, rules, defaultValue });

  return (
    <S.Input
      {...field}
      id={field.name}
      value={field.value ? field.value : ""}
      disabled={disabled}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export default InputField;
