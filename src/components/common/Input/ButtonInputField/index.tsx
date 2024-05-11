import { ForwardedRef, forwardRef } from "react";

import { StyledButtonWrapper, StyledConfirmButton, StyledInputWrapper } from "../styles";
import TextInputField, { InputFieldProps } from "../TextInputField";

type ButtonInputProps = {
  handleClick?: () => void;
  enabled?: boolean;
} & InputFieldProps;

const ButtonInputField = forwardRef(function ButtonInputField(
  props: ButtonInputProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const { handleClick, enabled, ...rest } = props;

  return (
    <StyledInputWrapper>
      <TextInputField type="text" ref={ref} {...rest} />
      <StyledButtonWrapper>
        <StyledConfirmButton
          type="button"
          onClick={handleClick}
          disabled={!enabled}
          className={enabled ? "" : "inactive"}
        >
          중복확인
        </StyledConfirmButton>
      </StyledButtonWrapper>
    </StyledInputWrapper>
  );
});

export default ButtonInputField;
