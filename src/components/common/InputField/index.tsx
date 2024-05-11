import { type ForwardedRef, forwardRef } from "react";
import { FieldValues, UseFormRegister, ValidationRule } from "react-hook-form";

import * as S from "./styles";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "pattern"> {
  name?: string;
  isRequired?: boolean;
  pattern?: ValidationRule<RegExp>;
  register?: UseFormRegister<FieldValues>;
  borderColor?: string;
}

const InputField = forwardRef(function InputField(
  {
    name,
    isRequired,
    pattern,
    placeholder,
    disabled = false,
    register,
    borderColor,
    ...props
  }: InputFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <S.Input
      ref={ref}
      {...(register && register(name || "", { required: isRequired, pattern }))}
      id={name}
      disabled={disabled}
      placeholder={placeholder}
      className={(props.defaultValue ?? props.value) !== props.value ? "default" : ""}
      borderColor={borderColor}
      {...props}
    />
  );
});

export default InputField;
