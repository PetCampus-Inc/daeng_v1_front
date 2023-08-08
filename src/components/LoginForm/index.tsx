import React, { useEffect, useState } from "react";
import {
  StyledWrapper,
  StyledTitle,
  StyledInputBox,
  StyledCheckboxLabel,
  StyledCheckbox,
  StyledButton,
} from "./styles";
import { handleChange } from "hooks/handleChange";

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState({ id: "", pw: "" });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = handleChange(e);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  useEffect(() => { });

  return (
    <StyledWrapper>
      <StyledTitle>Login</StyledTitle>
      <form>
        <StyledInputBox
          type="text"
          name="userName"
          placeholder="Email"
          value={credentials.id}
          onChange={handleInputChange}
        />
        <StyledInputBox
          type="password"
          name="userPassword"
          placeholder="Password"
          value={credentials.pw}
          onChange={handleInputChange}
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
};

export default LoginForm;
