import { PATH } from "constants/path";
import { ID_REGEX, PW_REGEX } from "constants/validCheck";

import Button from "components/common/Button";
import Header from "components/common/Header";
import useSignIn from "hooks/api/useSignIn";
import useShowPw from "hooks/common/useShowPw";
import { memo, useEffect, useState } from "react";
import { ThemeConfig } from "styles/ThemeConfig";

import DogOwner from "./DogOwner";
import InputBoxAndText from "./InputBoxAndText";
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
  Keyword
} from "./styles";

// **소셜 로그인 구현 필요**
const SignIn = () => {
  const {
    currentMainStep,
    setCurrentMainStep,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
    handlerLogin,
    handlerAdminLogin,
    isIdConfirmed,
    isPwConfirmed
  } = useSignIn();

  const { showPw, setShowPw, handleToggle } = useShowPw();
  const [isIdValid, setIsIdValid] = useState(false);
  const [isPwValid, setIsPwValid] = useState(false);

  useEffect(() => {
    ID_REGEX.test(inputId) ? setIsIdValid(true) : setIsIdValid(false);
    PW_REGEX.test(inputPw) ? setIsPwValid(true) : setIsPwValid(false);
  }, [inputId, inputId]);

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
        <DogOwner currentMainStep={currentMainStep} setCurrentMainStep={setCurrentMainStep} />
      )}

      {currentMainStep < 2 && (
        <Container>
          <TextWrapper height="10%">
            {currentMainStep === 0 ? (
              <TextWrapper direction="row">
                <Keyword>우리 강아지</Keyword>
                <StyledTitleText>의 유치원</StyledTitleText>
              </TextWrapper>
            ) : (
              <StyledTitleText>똑독 관리자로 시작하기</StyledTitleText>
            )}

            <StyledTitleText>{currentMainStep === 0 ? "생활을 보러 갈까요?" : ""}</StyledTitleText>
          </TextWrapper>

          {currentMainStep === 0 && (
            <ButtonWrapper>
              <Button
                width="100%"
                height="10%"
                text="카카오로 시작하기"
                backcolor="#fee500"
                textcolor={ThemeConfig.colors.black}
                marginbottom="3%"
                handleClick={() => {
                  window.location.href = "/oauth2/authorization/kakao";
                  // setCurrentMainStep(currentMainStep + 2);
                }}
              >
                <StyledImage src="images/kakao-logo.png" alt="kakao-logo" />
              </Button>
              <Button
                width="100%"
                height="10%"
                text="구글로 시작하기"
                backcolor={ThemeConfig.colors.white}
                textcolor={ThemeConfig.colors.gray_1}
                border="solid 1px #cccccc"
                marginbottom="3%"
                handleClick={() => {
                  // setCurrentMainStep(currentMainStep + 2);
                  handlerLogin();
                }}
              >
                <StyledImage src="images/google-logo.png" alt="google-logo" />
              </Button>
              <Button
                width="100%"
                height="10%"
                text="Apple로 시작하기"
                backcolor={ThemeConfig.colors.black}
                marginbottom="3%"
                handleClick={() => {
                  // setCurrentMainStep(currentMainStep + 2);
                  handlerLogin();
                }}
              >
                <StyledImage src="images/apple-logo.png" alt="apple-logo" />
              </Button>
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
                  !isIdConfirmed
                    ? !isIdValid
                      ? "잘못된 아이디입니다."
                      : "잘못된 아이디입니다."
                    : ""
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
                  !isPwConfirmed
                    ? !isPwValid
                      ? "잘못된 비밀번호입니다."
                      : "잘못된 비밀번호입니다."
                    : ""
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
                  <StyledLink to={PATH.SIGNUP}>처음이신가요? 회원가입하기 {">"}</StyledLink>
                </StyledSignInButton>
                <Button
                  width="100%"
                  height="30%"
                  text="로그인"
                  weight="bold"
                  size="1.1rem"
                  handleClick={() => {
                    handlerAdminLogin();
                  }}
                  backcolor={inputId && inputPw ? undefined : ThemeConfig.colors.gray_5}
                  textcolor={inputId && inputPw ? undefined : ThemeConfig.colors.gray_2}
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
