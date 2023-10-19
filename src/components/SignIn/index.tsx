import { memo, useState } from "react";
import {
  ButtonWrapper,
  Container,
  StyledTitleText,
  TextWrapper,
  StyledBottomWrapper,
  StyledInputBoxWrapper,
  StyledSignInButton,
  StyledImage,
  StyledLink,
} from "./styles";
import Button from "components/common/Button";
import useSignIn from "hooks/useSignIn";
import InputBoxAndText from "./InputBoxAndText";
import Header from "components/common/Header";
import useShowPw from "hooks/useShowPw";
import DogOwner from "./DogOwner";
import { ID_REGEX, PW_REGEX } from "constants/validCheck";

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

  const [isClicked, setIsClicked] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);

  const handleValidCheck = () => {
    setIsClicked(true);
    ID_REGEX.test(inputId) ? setIsIdValid(true) : setIsIdValid(false);
    PW_REGEX.test(inputPw) ? setIsPwValid(true) : setIsPwValid(false);
  };

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

      {currentMainStep === 2 && (
        <DogOwner
          currentMainStep={currentMainStep}
          setCurrentMainStep={setCurrentMainStep}
        />
      )}

      {currentMainStep < 2 && (
        <Container>
          <TextWrapper>
            <StyledTitleText>
              {currentMainStep === 0
                ? "반려견의 유치원"
                : "똑독 관리자 시작하기"}
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
                handleClick={() => {
                  setCurrentMainStep(currentMainStep + 2);
                }}
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
                handleClick={() => {
                  setCurrentMainStep(currentMainStep + 2);
                }}
              >
                <StyledImage src="images/google-logo.png" alt="google-logo" />
              </Button>
              <Button
                width="100%"
                height="10%"
                text="Apple로 시작하기"
                backcolor="#000000"
                marginbottom="3%"
                handleClick={() => {
                  setCurrentMainStep(currentMainStep + 2);
                }}
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
                errorText={
                  isClicked ? (!isIdValid ? "잘못된 아이디입니다." : "") : ""
                }
              />
              <InputBoxAndText
                className={showPw.className}
                text="비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                type={showPw.type}
                inputValue={inputPw}
                setInputValue={setInputPw}
                handleClick={handleToggle}
                errorText={
                  isClicked ? (!isPwValid ? "잘못된 비밀번호입니다." : "") : ""
                }
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
                  <StyledLink to="/SignUp">
                    처음이신가요? 회원가입하기
                  </StyledLink>
                </StyledSignInButton>
                <Button
                  width="100%"
                  height="30%"
                  text="로그인"
                  weight="bold"
                  size="1.1rem"
                  handleClick={() => {
                    handleValidCheck();
                    //todo login
                    //setCurrentMainStep(currentMainStep + 1);
                  }}
                  backcolor={isIdValid && isPwValid ? undefined : "#E9E9E9"}
                  textcolor={isIdValid && isPwValid ? undefined : "#B5B5B5"}
                />
              </>
            )}
          </StyledBottomWrapper>
        </Container>
      )}
    </>
  );
};

export default memo(SignIn);
