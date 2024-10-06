import { useMemberLogin } from "hooks/api/signin";
import { nativeBridge } from "libs/webviewBridge";
import { SocialProvider } from "types/member/auth.types";
import { getPlatform } from "utils/cross-browsing";
import showToast from "utils/showToast";

import { ButtonWrapper, StyledButton, StyledImage, StyledText } from "./styles";

const LoginButtonGroup = () => {
  const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform());

  const { mutateLogin } = useMemberLogin();

  const handleLogin = (provider: SocialProvider) => async () => {
    try {
      const idToken = await nativeBridge.socialLogin(provider);
      const fcmToken = await nativeBridge.getFcmToken();

      mutateLogin({ idToken, fcmToken });
    } catch (_) {
      showToast("로그인에 실패했습니다. 잠시후 다시 시도해주세요.", "bottom");
    }
  };

  return (
    <ButtonWrapper>
      <StyledButton
        type="button"
        aria-label="카카오로 계속하기"
        onClick={handleLogin("kakao")}
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
        onClick={handleLogin("google")}
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
          onClick={handleLogin("apple")}
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
