import { KAKAO_LOGIN_URL, GOOGLE_LOGIN_URL, APPLE_LOGIN_URL } from "constants/api";

import { ButtonWrapper, StyledButton, StyledImage, StyledText } from "./styles";

const LoginButtonGroup = () => {
  return (
    <ButtonWrapper>
      <StyledButton
        type="button"
        aria-label="카카오로 계속하기"
        onClick={() => (window.location.href = KAKAO_LOGIN_URL)}
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
        onClick={() => (window.location.href = GOOGLE_LOGIN_URL)}
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
        onClick={() => (window.location.href = APPLE_LOGIN_URL)}
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
