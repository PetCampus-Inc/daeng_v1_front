import React from "react";
import styled from "styled-components";

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
export const Wrapper = styled.div`
  width: 100%;
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border: None;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
`;

export const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 30px;
  font-weight: 900;
  color: #6a24fe;
`;

export const AccountInput = styled.input`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #f8f8f8;

  &::placeholder {
    color: #d2d2d2;
  }
`;

export const RememberCheckLabel = styled.label`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  font-size: 14px;
  color: #999999;
`;

export const CheckboxInput = styled(AccountInput)`
  width: auto;
  height: auto;
  margin-right: 10px;
`;

export const Submit = styled.input`
  width: 100%;
  height: 45px;
  color: #fff;
  font-size: 16px;
  background-color: #6a24fe;
  margin-top: 10px;
`;

export default LoginForm;
