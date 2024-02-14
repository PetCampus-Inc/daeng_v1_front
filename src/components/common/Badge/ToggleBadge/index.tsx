import React from "react";
import { Control, useController, UseControllerProps } from "react-hook-form";
import * as S from "./styles";

export interface ToggleBadgeProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "name">,
    UseControllerProps {
  control: Control;
  readOnly?: boolean;
}

const ToggleBadge = ({ control, name, readOnly = false, ...props }: ToggleBadgeProps) => {
  const REQUIRED = "필수";
  const OPTIONAL = "선택";

  const { field } = useController({
    control,
    name,
    defaultValue: OPTIONAL
  });
  const handleToggle = () => {
    field.onChange(field.value === OPTIONAL ? REQUIRED : OPTIONAL);
  };

  return (
    <S.ToggleButton
      id={field.name}
      onClick={handleToggle}
      aria-pressed={field.value === REQUIRED}
      readOnly={readOnly}
      {...props}
    >
      <S.LeftItem className={field.value === OPTIONAL ? "active" : ""}>{OPTIONAL}</S.LeftItem>
      <S.RightItem className={field.value === REQUIRED ? "active" : ""}>{REQUIRED}</S.RightItem>
      <input type="hidden" {...field} value={field.value} />
    </S.ToggleButton>
  );
};

export default ToggleBadge;
