import { useMemberLogin } from "hooks/api/signin";
import useNativeAction from "hooks/native/useNativeAction";
import { SocialProvider } from "types/member/auth.types";
import { getPlatform } from "utils/cross-browsing";
import showToast from "utils/showToast";

import { ButtonWrapper, StyledButton, StyledImage, StyledText } from "./styles";

const LoginButtonGroup = () => {
  const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());

  const { socialLogin } = useNativeAction();
  const { mutateLogin } = useMemberLogin();

  const handleLogin = (provider: SocialProvider) => async () => {
    const authData = await socialLogin(provider);

    mutateLogin(authData, {
      onError: (error) => showToast(error.message, "bottom")
    });
  };

  return (
    <ButtonWrapper>
      <StyledButton
        type="button"
        aria-label="카카오로 계속하기"
        onClick={handleLogin("KAKAO")}
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
        onClick={handleLogin("GOOGLE")}
        bg="white"
        borderColor="#CCCCCC"
      >
        <StyledImage src="images/google-logo.png" alt="google-logo" />
        <StyledText typo="label1_16_R" color="black">
          구글로 계속하기
        </StyledText>
      </StyledButton>

      {isIOS ? (
        <StyledButton
          type="button"
          aria-label="Apple로 로그인"
          onClick={handleLogin("APPLE")}
          bg="black"
          borderColor="black"
        >
          <StyledImage src="images/apple-logo.png" alt="apple-logo" />
          <StyledText typo="label1_16_R" color="white">
            Apple로 로그인
          </StyledText>
        </StyledButton>
      ) : null}
    </ButtonWrapper>
  );
};

export default LoginButtonGroup;
