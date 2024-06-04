import { KAKAO_API_URL, GOOGLE_API_URL } from "constants/api";

import { v4 as uuidv4 } from "uuid";

import { ButtonWrapper, StyledButton, StyledImage, StyledText } from "./styles";

const LoginButtonGroup = () => {
  const AppleLogin = () => {
    window.AppleID.auth.init({
      clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
      scope: "name email",
      redirectURI: process.env.REACT_APP_APPLE_REDIRECT_URI,
      state: uuidv4(),
      nonce: uuidv4(),
      usePopup: false
    });

    window.AppleID.auth.signIn();
  };

  return (
    <ButtonWrapper>
      <StyledButton
        type="button"
        aria-label="카카오로 계속하기"
        onClick={() => (window.location.href = KAKAO_API_URL)}
        bg="#FEE500"
      >
        <StyledImage src="images/kakao-logo.png" alt="kakao-logo" />
        <StyledText typo="label1_16_R" color="black">
          카카오로 계속하기
        </StyledText>
      </StyledButton>
      <StyledButton
        type="button"
        aria-label="구글로 계속하기"
        onClick={() => (window.location.href = GOOGLE_API_URL)}
        bg="white"
        borderColor="#CCCCCC"
      >
        <StyledImage src="images/google-logo.png" alt="google-logo" />
        <StyledText typo="label1_16_R" color="black">
          구글로 계속하기
        </StyledText>
      </StyledButton>

      <StyledButton
        type="button"
        aria-label="Apple로 로그인"
        onClick={AppleLogin}
        bg="black"
        borderColor="black"
      >
        <StyledImage src="images/apple-logo.png" alt="apple-logo" />
        <StyledText typo="label1_16_R" color="white">
          Apple로 로그인
        </StyledText>
      </StyledButton>
    </ButtonWrapper>
  );
};

export default LoginButtonGroup;
