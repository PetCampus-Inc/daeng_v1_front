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
  StyledInputBoxTitleText,
} from "./styles";
import Button from "components/common/Button";
import useSignIn from "hooks/useSignIn";
import InputBox from "components/common/InputBox";

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
        <>
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
          <div style={{ height: "10%" }} />
        </>
      )}

      {currentMainStep === 1 && (
        <>
          <StyledInputBoxTitleText>아이디</StyledInputBoxTitleText>
          <InputBox height="7%" width="90%" placeholdText="아이디" />
        </>
      )}

      <Button
        width="100%"
        height="7%"
        text="관리자로 시작하기"
        weight="bold"
        size="1.1rem"
        handleClick={() => {
          setCurrentMainStep(currentMainStep + 1);
        }}
      />
    </Container>
  );
};

export default memo(SignIn);
