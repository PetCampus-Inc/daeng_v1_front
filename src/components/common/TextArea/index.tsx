import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import * as S from "./styles";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  resizable?: boolean;
  rows?: number;
  name: string;
  register: UseFormRegister<FieldValues>;
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

    const { ref, ...rest } = register(name);

    useImperativeHandle(ref, () => textAreaRef.current!);

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

    const handleChange = () => {
      autoResize && adjustHeight();
    };

    return (
      <S.TextAreaInput
        resizable={resizable}
        disabled={disabled}
        {...rest}
        onChange={handleChange}
        rows={rows}
        $isChecked={isChecked}
        ref={textAreaRef}
        {...props}
      />
    );
  }
);

export default TextArea;
