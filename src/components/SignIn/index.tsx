import { memo } from "react";
import {
  AppleButton,
  ButtonWrapper,
  Container,
  GoogleButton,
  KakaoButton,
  StyledTitleText,
  TextWrapper,
  TryButton,
} from "./styles";
import Button from "components/common/Button";

const SignIn = () => {
  return (
    <Container>
      <TextWrapper>
        <StyledTitleText>반려견의 유치원</StyledTitleText>
        <StyledTitleText>생활을 보러 갈까요?</StyledTitleText>
      </TextWrapper>
      <ButtonWrapper>
        <KakaoButton>
          <img src="images/kakao-logo.png" alt="logo" />
          카카오로 시작하기
        </KakaoButton>
        <GoogleButton>
          <img src="images/google-logo.png" alt="logo" />
          구글로 시작하기
        </GoogleButton>
        <AppleButton>
          <img src="images/apple-logo.png" alt="logo" />
          Apple로 시작하기
        </AppleButton>
        <TryButton>서비스 체험하기</TryButton>
      </ButtonWrapper>
      <div style={{ height: "7%" }} />
      <Button
        width="100%"
        height="7%"
        text="관리자로 시작하기"
        weight="bold"
        size="1.1rem"
      />
    </Container>
  );
};

export default memo(SignIn);
