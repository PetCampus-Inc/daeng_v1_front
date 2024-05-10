import CloseEyesIcon from "assets/svg/close-eyes-icon";
import OpenEyesIcon from "assets/svg/open-eyes-icon";
import { type ForwardedRef, forwardRef, useState } from "react";

import * as S from "./styles";
import TextInputField, { type InputFieldProps } from "../TextInputField";

type PasswordInputFieldProps = Omit<InputFieldProps, "type">;

const PasswordInputField = forwardRef(function PasswordInputField(
  props: PasswordInputFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const [showPW, setShowPW] = useState<boolean>(false);

  const handleShowPwd = () => {
    setShowPW(!showPW);
  };

  return (
    <S.SearchInputWrapper>
      <TextInputField type={showPW ? "text" : "password"} className="pw" ref={ref} {...props} />
      {showPW ? (
        <S.SearchInputButton onClick={handleShowPwd}>
          <OpenEyesIcon />
        </S.SearchInputButton>
      ) : (
        <S.SearchInputButton onClick={handleShowPwd}>
          <CloseEyesIcon />
        </S.SearchInputButton>
      )}
    </S.SearchInputWrapper>
  );
});

export default PasswordInputField;
