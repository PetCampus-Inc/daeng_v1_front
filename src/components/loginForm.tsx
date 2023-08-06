import React from "react";
import styled from 'styled-components';

class LoginForm extends React.Component {
    render() {
        return (
            <div className="login-wrapper">
                <h2>Login</h2>
                
                <form method="post" action="서버의url" id="login-form">
                    <Input type="text" name="userName" placeholder="Email" />
                    <Input type="password" name="userPassword" placeholder="Password" />
                    <label htmlFor="remember-check">
                        <Input type="checkbox" id="remember-check" />아이디 저장하기 
                    </label>
                    <SubmitInput type="submit" value="Login" />
                </form>
            </div>
        );
    }
}


export const Input = styled.input`
    width: 100%;
    height: 48px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-bottom: 16px;
    border-radius: 6px;
    background-color: #F8F8F8;

    &::placeholder {
        color: #D2D2D2;
    }
`;

export const SubmitInput = styled(Input)`
    color: #fff;
    font-size: 16px;
    background-color: #6A24FE;
    margin-top: 20px;
`;

export default LoginForm;