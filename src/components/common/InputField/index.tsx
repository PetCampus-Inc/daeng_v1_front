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

const InputField = ({
  name,
  isRequired,
  pattern,
  placeholder,
  disabled = false,
  register,
  borderColor,
  ...props
}: InputFieldProps) => {
  return (
    <S.Input
      {...(register && register(name || "", { required: isRequired, pattern }))}
      id={name}
      disabled={disabled}
      placeholder={placeholder}
      className={props.defaultValue !== props.value ? "default" : ""}
      borderColor={borderColor}
      {...props}
    />
  );
};

export default InputField;
