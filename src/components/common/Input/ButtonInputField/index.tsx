import { ForwardedRef, forwardRef } from "react";

import { StyledButtonWrapper, StyledConfirmButton, StyledInputWrapper } from "../styles";
import TextInputField, { InputFieldProps } from "../TextInputField";

type ButtonInputProps = {
  label?: string;
  handleClick?: () => void;
  enabled?: boolean;
  btnHidden?: boolean;
} & InputFieldProps;

const ButtonInputField = forwardRef(function ButtonInputField(
  props: ButtonInputProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const { handleClick, enabled, label, btnHidden, ...rest } = props;

  return (
    <StyledInputWrapper>
      <TextInputField type="text" ref={ref} {...rest} />
      <StyledButtonWrapper>
        <StyledConfirmButton
          type="button"
          data-state-hidden={btnHidden}
          onClick={handleClick}
          disabled={!enabled}
          className={enabled ? "" : "inactive"}
        >
          {label}
        </StyledConfirmButton>
      </StyledButtonWrapper>
    </StyledInputWrapper>
  );
});

export default ButtonInputField;
