import React from "react";
import {
  Wrapper,
  Title,
  AccountInput,
  CheckboxInput,
  RememberCheckLabel,
  Submit,
} from "./style";

class LoginForm extends React.Component {
  render() {
    return (
      <Wrapper>
        <Title>Login</Title>
        <form>
          <AccountInput type="text" name="userName" placeholder="Email" />
          <AccountInput
            type="password"
            name="userPassword"
            placeholder="Password"
          />
          <RememberCheckLabel htmlFor="remember-check">
            <CheckboxInput type="checkbox" id="remember-check" />
            아이디 저장하기
          </RememberCheckLabel>
          <Submit
            type="submit"
            value="Submit"
            onClick={() => window.alert("Login has requested.")}
          />
        </form>
      </Wrapper>
    );
  }
}

export default LoginForm;
