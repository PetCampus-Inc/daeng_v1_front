import React, { useEffect, useRef, forwardRef } from "react";

import * as S from "./styles";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  rows?: number;
  isChecked?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ rows = 1, autoResize = true, isChecked, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      adjustHeight?.();
    }, [autoResize]);

    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight?.();
      props.onChange?.(e);
    };

    const setRefs = (element: HTMLTextAreaElement | null) => {
      textareaRef.current = element;

      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        ref.current = element;
      }
    };

    return (
      <S.Textarea
        {...props}
        ref={setRefs}
        rows={rows}
        onChange={handleChange}
        isChecked={isChecked}
      />
    );
  }
);

Textarea.displayName = "Textarea";
