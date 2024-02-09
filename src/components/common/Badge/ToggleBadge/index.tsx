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
  const required = "필수";
  const optional = "선택";

  const { field } = useController({
    control,
    name,
    defaultValue: optional
  });
  const handleToggle = () => {
    field.onChange(field.value === optional ? required : optional);
  };

  return (
    <S.ToggleButton
      id={field.name}
      onClick={handleToggle}
      aria-pressed={field.value === required}
      readOnly={readOnly}
      {...props}
    >
      <S.LeftItem className={field.value === optional ? "active" : ""}>{optional}</S.LeftItem>
      <S.RightItem className={field.value === required ? "active" : ""}>{required}</S.RightItem>
      <input type="hidden" {...field} value={field.value} />
    </S.ToggleButton>
  );
};

export default ToggleBadge;
