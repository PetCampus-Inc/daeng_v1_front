import React from "react";
import {
  StyledWrapper,
  StyledTitle,
  StyledInputBox,
  StyledCheckboxLabel,
  StyledCheckbox,
  StyledButton,
} from "./styles";
import useLoginCredentials from "hooks/useLoginCredentials";


const LoginForm: React.FC = () => {
  const { credentials, handleCredentialChange, handleSubmit } = useLoginCredentials();

  return (
    <StyledWrapper>
      <StyledTitle>Login</StyledTitle>
      <form>
        <StyledInputBox
          type="text"
          name="userName"
          placeholder="Email"
          value={credentials.userName}
          onChange={handleCredentialChange}
        />
        <StyledInputBox
          type="password"
          name="userPassword"
          placeholder="Password"
          value={credentials.userPassword}
          onChange={handleCredentialChange}
        />
        <StyledCheckbox htmlFor="remember-check">
          <StyledCheckboxLabel type="checkbox" id="remember-check" />
          아이디 저장하기
        </StyledCheckbox>
        <StyledButton
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>
    </StyledWrapper>
  );
};

export default LoginForm;
