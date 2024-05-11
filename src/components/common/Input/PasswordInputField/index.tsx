import CloseEyesIcon from "assets/svg/close-eyes-icon";
import OpenEyesIcon from "assets/svg/open-eyes-icon";
import { type ForwardedRef, forwardRef, useState, memo } from "react";

import { StyledInputButton, StyledInputWrapper } from "../styles";
import TextInputField, { type InputFieldProps } from "../TextInputField";

type PasswordInputFieldProps = Omit<InputFieldProps, "type">;

const PasswordInputField = memo(
  forwardRef(function PasswordInputField(
    props: PasswordInputFieldProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) {
    const [showPW, setShowPW] = useState<boolean>(false);

    const handleShowPwd = () => {
      setShowPW(!showPW);
    };

    return (
      <StyledInputWrapper>
        <TextInputField type={showPW ? "text" : "password"} className="pw" ref={ref} {...props} />
        {showPW ? (
          <StyledInputButton onClick={handleShowPwd}>
            <OpenEyesIcon />
          </StyledInputButton>
        ) : (
          <StyledInputButton onClick={handleShowPwd}>
            <CloseEyesIcon />
          </StyledInputButton>
        )}
      </StyledInputWrapper>
    );
  })
);

export default PasswordInputField;
