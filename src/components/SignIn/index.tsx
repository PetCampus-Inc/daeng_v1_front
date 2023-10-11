import { memo, useState } from "react";
import {
  ButtonWrapper,
  Container,
  StyledTitleText,
  TextWrapper,
  StyledBottomWrapper,
  StyledInputBoxWrapper,
  StyledSignInButton,
  StyledSelectRoleWrapper,
  StyledImage,
} from "./styles";
import Button from "components/common/Button";
import useSignIn from "hooks/useSignIn";
import InputBoxAndText from "./InputBoxAndText";
import Header from "components/common/Header";
import RoleBox from "./RoleBox";
import { RoleConstants } from "constants/index";
import SignUp from "components/SignUp";

const SignIn = () => {
  const {
    currentMainStep,
    setCurrentMainStep,
    inputId,
    setInputId,
    inputPw,
    setInputPw,
    selectedRole,
    setSelectedRole,
  } = useSignIn();

  const [showPw, setShowPw] = useState({
    type: "password",
    className: "password",
  });

  const handleToggle = () => {
    setShowPw(() => {
      if (showPw.type === "password") {
        return { type: "text", className: "text" };
      }
      return { type: "password", className: "password" };
    });
  };

  return (
    <>
      {currentMainStep !== 0 && currentMainStep < 3 && (
        <Header
          type={currentMainStep === 1 ? "back" : "text"}
          text={currentMainStep === 2 ? "역할 선택" : undefined}
          handleClick={() => {
            setCurrentMainStep(currentMainStep - 1);
          }}
        />
      )}

      {currentMainStep === 3 && (
        <SignUp
          currentMainStep={currentMainStep}
          setCurrentMainStep={setCurrentMainStep}
          selectedRole={selectedRole}
        />
      )}

      {currentMainStep < 3 && (
        <Container step={currentMainStep}>
          {currentMainStep !== 2 && (
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
          )}

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
                inputValue={inputId}
                setInputValue={setInputId}
              />
              <InputBoxAndText
                className={showPw.className}
                text="비밀번호"
                type={showPw.type}
                inputValue={inputPw}
                setInputValue={setInputPw}
                handleClick={handleToggle}
              />
            </StyledInputBoxWrapper>
          )}

          {currentMainStep === 2 && (
            <StyledSelectRoleWrapper>
              <RoleBox
                selected={selectedRole === 0 ? true : false}
                mainText={RoleConstants[0].role}
                subText={RoleConstants[0].description}
                handleClick={() => {
                  selectedRole === 0 ? setSelectedRole(-1) : setSelectedRole(0);
                }}
              />
              <RoleBox
                selected={selectedRole === 1 ? true : false}
                mainText={RoleConstants[1].role}
                subText={RoleConstants[1].description}
                handleClick={() => {
                  selectedRole === 1 ? setSelectedRole(-1) : setSelectedRole(1);
                }}
              />
            </StyledSelectRoleWrapper>
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
                <StyledSignInButton
                  onClick={() => {
                    setCurrentMainStep(currentMainStep + 1);
                  }}
                >
                  {"처음이신가요? 회원가입하기"}
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
            {currentMainStep === 2 && (
              <Button
                width="100%"
                height="30%"
                text="다음"
                weight="bold"
                size="1.1rem"
                handleClick={() => {
                  setCurrentMainStep(currentMainStep + 1);
                }}
                backcolor={selectedRole !== -1 ? undefined : "#E9E9E9"}
                textcolor={selectedRole !== -1 ? undefined : "#B5B5B5"}
              />
            )}
          </StyledBottomWrapper>
        </Container>
      )}
    </>
  );
};

export default memo(SignIn);
