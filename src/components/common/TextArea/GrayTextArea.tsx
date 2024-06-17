import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react";

import * as S from "./styles";

// MEMO: 이 컴포넌트는 사용되는 곳이 없어서 삭제해도 될 것 같습니다.
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  autoResize?: boolean;
  resizable?: boolean;
  rows?: number;
  isChecked?: boolean;
}

const GrayTextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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

    const handleChange = () => {
      autoResize && adjustHeight();
    };

    return (
      <S.TextAreaInput
        {...props}
        name={name}
        resizable={resizable}
        disabled={disabled}
        onChange={handleChange}
        rows={rows}
        $isChecked={isChecked}
        ref={textAreaRef}
      />
    );
  }
);

export default GrayTextArea;
