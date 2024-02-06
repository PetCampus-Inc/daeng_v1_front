import React from "react";
import { Control, FieldValues, UseControllerProps, useController } from "react-hook-form";

import * as S from "./styles";

export interface InputFieldProps<TFieldValues extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name">,
    UseControllerProps<TFieldValues> {
  control: Control<TFieldValues>;
}

const InputField = <TFieldValues extends FieldValues>({
  ...props
}: InputFieldProps<TFieldValues>) => {
  const { field } = useController({ ...props, name: props.name });

  return <S.Input {...field} id={field.name} value={field.value ? field.value : ""} {...props} />;
};

export default InputField;
