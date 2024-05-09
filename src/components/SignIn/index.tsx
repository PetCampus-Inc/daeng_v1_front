import { KAKAO_API_URL } from "constants/api";
import { PATH } from "constants/path";

import { Flex, Text } from "components/common";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ButtonWrapper, Container, StyledImage, StyledButton, StyledText } from "./styles";

// **소셜 로그인 구현 필요**
const SignIn = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <div>
        <Text typo="title1_24_B" color="darkBlack">
          <em color="primaryColor">우리 강아지</em>의 유치원
          <br /> 생활을 보러 갈까요?
        </Text>
        <ButtonWrapper>
          <StyledButton
            type="button"
            aria-label="카카오로 계속하기"
            onClick={() => {
              window.location.href = KAKAO_API_URL;
            }}
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
            onClick={() => {
              console.log("구글 로그인");
            }}
            bg="white"
            borderColor="#CCCCCC"
          >
            <StyledImage src="images/google-logo.png" alt="google-logo" />
            <StyledText typo="label1_16_R" color="black">
              구글로 계속하기
            </StyledText>
          </StyledButton>

          <StyledButton
            type="button"
            aria-label="Apple로 로그인"
            onClick={() => {
              console.log("Apple로 로그인");
            }}
            bg="black"
            borderColor="black"
          >
            <StyledImage src="images/apple-logo.png" alt="apple-logo" />
            <StyledText typo="label1_16_R" color="white">
              Apple로 로그인
            </StyledText>
          </StyledButton>
        </ButtonWrapper>
        <Flex align="center" justify="center">
          <Link to={"서비스 체험하기"}>
            <Text typo="label2_14_B" color="gray_1">
              서비스 체험하기
            </Text>
          </Link>
        </Flex>
      </div>

      <Flex direction="column" align="center" gap={8}>
        <Text typo="label2_14_M" color="gray_2">
          <Link to={"이용약관"}>이용약관</Link> |{" "}
          <Link to={"개인정보 처리 방침"}>개인정보 처리 방침</Link>
        </Text>
        <StyledButton bg="primaryColor" onClick={() => navigate(PATH.ADMIN_LOGIN)}>
          <Text typo="label1_16_B" color="white">
            관리자로 시작하기
          </Text>
        </StyledButton>
      </Flex>
    </Container>
  );
};

export default memo(SignIn);
