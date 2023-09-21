import { memo } from "react";
import {
  AppleButton,
  ButtonWrapper,
  Container,
  GoogleButton,
  KakaoButton,
  Text,
  TextWrapper,
  TryButton,
} from "./styles";

const SignIn = () => {
  return (
    <Container>
      <TextWrapper>
        <Text>반려견의 유치원</Text>
        <Text>생활을 보러 갈까요?</Text>
      </TextWrapper>
      <ButtonWrapper>
        <KakaoButton>
          <img src="images/kakao-logo.png" alt="logo" />
          카카오로 계속하기
        </KakaoButton>
        <GoogleButton>
          <img src="images/google-logo.png" alt="logo" />
          구글로 계속하기
        </GoogleButton>
        <AppleButton>
          <img src="images/apple-logo.png" alt="logo" />
          Apple로 로그인
        </AppleButton>
        <TryButton>서비스 체험하기</TryButton>
      </ButtonWrapper>
    </Container>
  );
};

export default memo(SignIn);
