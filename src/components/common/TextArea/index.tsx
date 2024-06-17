import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import * as S from "./styles";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  autoResize?: boolean;
  resizable?: boolean;
  rows?: number;
  isChecked?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      name,
      autoResize = true,
      resizable = false,
      rows = 1,
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
      autoResize && adjustHeight();
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <S.TextAreaInput
        ref={textAreaRef}
        name={name}
        resizable={resizable}
        disabled={disabled}
        onChange={handleChange}
        rows={rows}
        $isChecked={isChecked}
        {...props}
      />
    );
  }
);

export default TextArea;
