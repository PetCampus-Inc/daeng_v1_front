import { BsCheck } from "react-icons/bs";

import * as S from "./styles";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  name?: string;
  children?: React.ReactNode;
  id?: string;
}

const Checkbox = ({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  isChecked = false,
  isDisabled = false,
  name,
  value,
  children,
  id,
  ...props
}: CheckboxProps) => (
  <S.CheckboxContainer htmlFor={id}>
    <S.HiddenCheckbox
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      id={id}
      checked={isChecked}
      name={name}
      {...props}
    />
    <S.Checkbox data-checked={isChecked ? "" : null} data-disabled={isDisabled ? "" : null}>
      <BsCheck className="checkbox-icon" />
    </S.Checkbox>
    <S.LabelText data-checked={isChecked ? "" : null} data-disabled={isDisabled ? "" : null}>
      {children}
    </S.LabelText>
  </S.CheckboxContainer>
);

export default Checkbox;
