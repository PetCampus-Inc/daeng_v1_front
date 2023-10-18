import { memo } from "react";
import {
  ButtonWrapper,
  Container,
  StyledTitleText,
  TextWrapper,
  StyledBottomWrapper,
  StyledInputBoxWrapper,
  StyledSignInButton,
  StyledImage,
} from "./styles";
import Button from "components/common/Button";
import useSignIn from "hooks/useSignIn";
import InputBoxAndText from "./InputBoxAndText";
import Header from "components/common/Header";
import { Link } from "react-router-dom";
import useShowPw from "hooks/useShowPw";

const SignIn = () => {
  const {
    currentMainStep,
    setCurrentMainStep,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
  } = useSignIn();

  const { showPw, setShowPw, handleToggle } = useShowPw();

  return (
    <>
      {currentMainStep === 1 && (
        <Header
          type="back"
          handleClick={() => {
            setCurrentMainStep(currentMainStep - 1);
          }}
        />
      )}

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
            <Button
              width="100%"
              height="10%"
              text="카카오로 시작하기"
              backcolor="#fee500"
              textcolor="#000000"
              marginbottom="3%"
            >
              <StyledImage src="images/kakao-logo.png" alt="kakao-logo" />
            </Button>
            <Button
              width="100%"
              height="10%"
              text="구글로 시작하기"
              backcolor="#ffffff"
              textcolor="#000000"
              border="solid 1px #cccccc"
              marginbottom="3%"
            >
              <StyledImage src="images/google-logo.png" alt="google-logo" />
            </Button>
            <Button
              width="100%"
              height="10%"
              text="Apple로 시작하기"
              backcolor="#000000"
              marginbottom="3%"
            >
              <StyledImage src="images/apple-logo.png" alt="apple-logo" />
            </Button>
            <Button
              width="100%"
              height="10%"
              text="서비스 체험하기"
              backcolor="#fffff"
              textcolor="#525252"
            />
          </ButtonWrapper>
        )}

        {currentMainStep === 1 && (
          <StyledInputBoxWrapper>
            <InputBoxAndText
              text="아이디"
              type="text"
              placeholder="아이디를 입력해 주세요"
              inputValue={inputId}
              setInputValue={setInputId}
            />
            <InputBoxAndText
              className={showPw.className}
              text="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              type={showPw.type}
              inputValue={inputPw}
              setInputValue={setInputPw}
              handleClick={handleToggle}
            />
          </StyledInputBoxWrapper>
        )}

        <StyledBottomWrapper>
          {currentMainStep === 0 && (
            <Button
              width="100%"
              height="32%"
              text="관리자로 시작하기"
              weight="bold"
              handleClick={() => {
                setCurrentMainStep(currentMainStep + 1);
              }}
            />
          )}
          {currentMainStep === 1 && (
            <>
              <StyledSignInButton>
                <Link to="/SignUp">{"처음이신가요? 회원가입하기"}</Link>
              </StyledSignInButton>
              <Button
                width="100%"
                height="30%"
                text="로그인"
                weight="bold"
                size="1.1rem"
                handleClick={() => {
                  //todo login
                  //setCurrentMainStep(currentMainStep + 1);
                }}
                backcolor={
                  inputId.length > 4 && inputPw.length > 4
                    ? undefined
                    : "#E9E9E9"
                }
                textcolor={
                  inputId.length > 4 && inputPw.length > 4
                    ? undefined
                    : "#B5B5B5"
                }
              />
            </>
          )}
        </StyledBottomWrapper>
      </Container>
    </>
  );
};

export default memo(SignIn);
