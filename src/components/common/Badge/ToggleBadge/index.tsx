import React from "react";
import { Control, useController, UseControllerProps } from "react-hook-form";

import * as S from "./styles";

export interface ToggleBadgeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name">,
    UseControllerProps {
  control: Control;
  readOnly?: boolean;
}

const ToggleBadge = ({ control, name, readOnly = false, ...props }: ToggleBadgeProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: true
  });

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) {
      event.preventDefault();
      return;
    }
    field.onChange(event.target.checked);
  };

  return (
    <S.ToggleBox>
      <S.HiddenCheckbox
        type="checkbox"
        {...field}
        {...props}
        id={field.name}
        checked={field.value}
        onChange={handleToggle}
      />
      <S.LeftItem className={field.value ? "" : "active"} readOnly={readOnly}>
        선택
      </S.LeftItem>
      <S.RightItem className={field.value ? "active" : ""} readOnly={readOnly}>
        필수
      </S.RightItem>
    </S.ToggleBox>
  );
};

export default ToggleBadge;
