import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as S from "./styles";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  resizable?: boolean;
  readOnly?: boolean;
  rows?: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { autoResize = true, resizable = false, readOnly = false, rows = 1, ...props },
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
      <S.TextArea
        ref={textAreaRef}
        resizable={resizable}
        readOnly={readOnly}
        onChange={handleChange}
        rows={rows}
        {...props}
      />
    );
  }
);

export default TextArea;
