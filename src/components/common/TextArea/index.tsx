import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import * as S from "./styles";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  resizable?: boolean;
  rows?: number;
  name?: string;
  register?: UseFormRegister<FieldValues>;
  isChecked?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      autoResize = true,
      resizable = false,
      rows = 1,
      register,
      name,
      disabled = false,
      isChecked = false,
      ...props
    },
    forwardedRef
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(forwardedRef, () => textAreaRef.current!);

    useEffect(() => {
      autoResize && adjustHeight();
    }, []);

    const adjustHeight = () => {
      const textarea = textAreaRef.current;

      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (props.onChange) {
        props.onChange(e);
      }
      autoResize && adjustHeight();
    };

    return (
      <S.TextAreaInput
        ref={textAreaRef}
        resizable={resizable}
        disabled={disabled}
        onChange={handleChange}
        rows={rows}
        $isChecked={isChecked}
        {...(name && register && register(name))}
        {...props}
      />
    );
  }
);

export default TextArea;
