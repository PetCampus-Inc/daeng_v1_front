import React from "react";
import { ValidationRule, useFormContext } from "react-hook-form";

import * as S from "./styles";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "pattern"> {
  name: string;
  isRequired?: boolean;
  pattern?: ValidationRule<RegExp>;
}

const InputField = ({
  name,
  isRequired,
  pattern,
  placeholder,
  disabled = false,
  ...inputProps
}: InputFieldProps) => {
  const { register } = useFormContext();

  return (
    <S.Input
      {...register(name || "", { required: isRequired, pattern })}
      id={name}
      disabled={disabled}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export default InputField;
