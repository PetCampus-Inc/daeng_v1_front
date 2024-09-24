import { type ForwardedRef, forwardRef } from "react";
import { CSSProp } from "styled-components";

import * as S from "./styles";

import type {
  FieldValues,
  Message,
  RegisterOptions,
  UseFormRegister,
  ValidationRule
} from "react-hook-form";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "required"> {
  name?: string;
  css?: CSSProp;
  register?: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  required?: Message | ValidationRule<boolean>;
}

const TextInputField = forwardRef(function TextInputField(
  { css, rules, register, required, name, ...props }: InputFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const registerProps = name && register && register(name, { required, ...rules });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.pattern) {
      const regex = new RegExp(`${props.pattern}`);
      const currentValue = event.target.value;

      if (!regex.test(currentValue)) {
        event.target.value = currentValue.slice(0, -1);
        event.preventDefault();
      }
    }
  };

  return (
    <S.Input
      ref={ref}
      {...registerProps}
      className={(props.defaultValue ?? props.value) !== props.value ? "default" : ""}
      onInput={handleInput}
      css={css}
      {...props}
    />
  );
});

export default TextInputField;
