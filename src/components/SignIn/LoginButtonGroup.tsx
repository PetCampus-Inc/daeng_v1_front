import { ButtonWrapper, StyledButton, StyledImage, StyledText } from "./styles";

const LoginButtonGroup = () => {
  return (
    <ButtonWrapper>
      <StyledButton
        type="button"
        aria-label="카카오로 계속하기"
        onClick={() => (window.location.href = "")}
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
        onClick={() => (window.location.href = "")}
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
        onClick={() => (window.location.href = "")}
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
