import React from "react";
import { Control, FieldValues, Path, PathValue, useController } from "react-hook-form";

import * as S from "./styles";

export interface InputFieldProps<TFieldValues extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name"> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
}

const InputField = <TFieldValues extends FieldValues>({
  ...props
}: InputFieldProps<TFieldValues>) => {
  const { field } = useController({ ...props, name: props.name });

  return <S.Input {...field} id={field.name} {...props} />;
};

export default InputField;
