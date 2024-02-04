import { BsCheck } from "react-icons/bs";

import * as S from "./styles";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  isChecked?: boolean;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  disabled?: boolean;
}

const Checkbox = ({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  isChecked = false,
  name,
  value,
  children,
  id,
  disabled = false,
  ...props
}: CheckboxProps) => (
  <S.CheckboxContainer htmlFor={id}>
    <S.HiddenCheckbox
      type="checkbox"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      id={id}
      checked={isChecked}
      name={name}
      disabled={disabled}
      {...props}
    />
    <S.Checkbox
      className={isChecked ? "checked" : ""}
      aria-disabled={disabled ? "true" : undefined}
    >
      <BsCheck className="checkbox-icon" />
    </S.Checkbox>
    <S.LabelText
      className={isChecked ? "checked" : ""}
      aria-disabled={disabled ? "true" : undefined}
    >
      {children}
    </S.LabelText>
  </S.CheckboxContainer>
);

export default Checkbox;
