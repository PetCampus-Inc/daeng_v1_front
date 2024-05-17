import { type ForwardedRef, forwardRef } from "react";

import { StyledInputSuffix, StyledInputWrapper } from "../styles";
import TextInputField, { type InputFieldProps } from "../TextInputField";

interface DateInputFieldProps extends InputFieldProps {
  unit: string; // ex. "년", "월", "일"
}

const DateInputField = forwardRef(function DateInputField(
  { unit, ...props }: DateInputFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return (
    <StyledInputWrapper>
      <TextInputField type="text" ref={ref} {...props} />
      <StyledInputSuffix as="span">{unit}</StyledInputSuffix>
    </StyledInputWrapper>
  );
});

export default DateInputField;
