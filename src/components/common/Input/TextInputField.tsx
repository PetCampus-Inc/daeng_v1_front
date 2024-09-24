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
  regex?: RegExp;
  name?: string;
  css?: CSSProp;
  register?: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  required?: Message | ValidationRule<boolean>;
}

const TextInputField = forwardRef(function TextInputField(
  { css, rules, regex, register, required, name, ...props }: InputFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const registerProps = name && register && register(name, { required, ...rules });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (regex) {
      const currentValue = event.target.value;

      if (!regex.test(currentValue)) {
        const lastValidValue = currentValue.slice(0, -1);
        event.target.value = lastValidValue;
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
