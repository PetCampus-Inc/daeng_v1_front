import React from "react";

class SignIn extends React.Component {
    render() {
        return (
            <div className="login-wrapper">
                <h2>Login</h2>
                <form method="post" action="서버의url" id="login-form">
                    <input type="text" name="userName" placeholder="Email" />
                    <input type="password" name="userPassword" placeholder="Password" />
                    <label htmlFor="remember-check">
                        <input type="checkbox" id="remember-check" />아이디 저장하기 
                    </label>
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default SignIn;