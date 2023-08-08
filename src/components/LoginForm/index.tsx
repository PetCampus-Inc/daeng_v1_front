import React from "react";
import {
  StyledWrapper,
  StyledTitle,
  StyledInputBox,
  StyledCheckboxLabel,
  StyledCheckbox,
  StyledButton,
} from "./styles";

class LoginForm extends React.Component {
  render() {
    return (
      <StyledWrapper>
        <StyledTitle>Login</StyledTitle>
        <form>
          <StyledInputBox type="text" name="userName" placeholder="Email" />
          <StyledInputBox
            type="password"
            name="userPassword"
            placeholder="Password"
          />
          <StyledCheckbox htmlFor="remember-check">
            <StyledCheckboxLabel type="checkbox" id="remember-check" />
            아이디 저장하기
          </StyledCheckbox>
          <StyledButton
            type="submit"
            value="Submit"
            onClick={() => window.alert("Login has requested.")}
          />
        </form>
      </StyledWrapper>
    );
  }
}

export default LoginForm;
