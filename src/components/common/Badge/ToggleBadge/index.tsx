import React from "react";
import { Control, useController, UseControllerProps } from "react-hook-form";
import * as S from "./styles";

export interface ToggleBadgeProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name">,
    UseControllerProps {
  control: Control;
  readOnly?: boolean;
  hasToggle?: boolean;
}

const ToggleBadge = ({
  control,
  name,
  readOnly = false,
  hasToggle,
  ...props
}: ToggleBadgeProps) => {
  const { field } = useController({
    control,
    name,
    defaultValue: true
  });

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.checked);
  };

  return hasToggle ? (
    <S.ToggleBox readOnly={readOnly}>
      <S.HiddenCheckbox
        type="checkbox"
        {...field}
        {...props}
        id={field.name}
        checked={field.value}
        onChange={handleToggle}
      />
      <S.LeftItem className={field.value ? "" : "active"}>선택</S.LeftItem>
      <S.RightItem className={field.value ? "active" : ""}>필수</S.RightItem>
    </S.ToggleBox>
  ) : (
    <S.HiddenCheckbox
      type="checkbox"
      {...field}
      {...props}
      id={field.name}
      checked={field.value}
      onChange={handleToggle}
    />
  );
};

export default ToggleBadge;
