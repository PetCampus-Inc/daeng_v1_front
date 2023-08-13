import React, { useState } from "react";
import {
  StyledWrapper,
  StyledTitle,
  StyledInputBox,
  StyledCheckboxLabel,
  StyledCheckbox,
  StyledButton,
} from "./styles";


const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ userName: "", userPassword: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials, [name]: value
    }));
  };


  return (
    <StyledWrapper>
      <StyledTitle>Login</StyledTitle>
      <form>
        <StyledInputBox
          type="text"
          name="userName"
          placeholder="Email"
          value={credentials.userName}
          onChange={handleInputChange}
        />
        <StyledInputBox
          type="password"
          name="userPassword"
          placeholder="Password"
          value={credentials.userPassword}
          onChange={handleInputChange}
        />
        <StyledCheckbox htmlFor="remember-check">
          <StyledCheckboxLabel type="checkbox" id="remember-check" />
          아이디 저장하기
        </StyledCheckbox>
        <StyledButton
          type="submit"
          value="Submit"
          onClick={() => window.alert(`Login has requested.\nID: ${credentials.userName}\nPassword: ${credentials.userPassword}`)}
        />
      </form>
    </StyledWrapper>
  );
};

export default LoginForm;
