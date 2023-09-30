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
  StyledBottomWrapper,
  StyledInputBoxWrapper,
} from "./styles";
import Button from "components/common/Button";
import useSignIn from "hooks/useSignIn";
import InputBoxAndText from "./InputBoxAndText";

const SignIn = () => {
  const { currentMainStep, setCurrentMainStep } = useSignIn();

  return (
    <Container>
      <TextWrapper>
        <StyledTitleText>
          {currentMainStep === 0 ? "반려견의 유치원" : "똑독 관리자 시작하기"}
        </StyledTitleText>
        <StyledTitleText>
          {currentMainStep === 0 ? "생활을 보러 갈까요?" : ""}
        </StyledTitleText>
      </TextWrapper>

      {currentMainStep === 0 && (
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
      )}

      {currentMainStep === 1 && (
        <StyledInputBoxWrapper>
          <InputBoxAndText text="아이디" />
          <InputBoxAndText text="비밀번호" />
        </StyledInputBoxWrapper>
      )}

      <StyledBottomWrapper>
        <Button
          width="100%"
          height="30%"
          text="관리자로 시작하기"
          weight="bold"
          size="1.1rem"
          handleClick={() => {
            setCurrentMainStep(currentMainStep + 1);
          }}
        />
      </StyledBottomWrapper>
    </Container>
  );
};

export default memo(SignIn);
