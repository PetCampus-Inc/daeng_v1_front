import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import * as S from "./styles";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  resizable?: boolean;
  rows?: number;
  name: string;
  isChecked?: boolean;
  isRequired?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      autoResize = true,
      resizable = false,
      rows = 1,
      name,
      disabled = false,
      isChecked = false,
      isRequired = false,
      ...props
    },
    forwardedRef
  ) => {
    const { register } = useFormContext();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const { ref, ...rest } = register(name, { required: isRequired });

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
