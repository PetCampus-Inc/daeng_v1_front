import { routes } from "constants/path";

import { Box, Flex, Layout, Text } from "components/common";
import LoginButtonGroup from "components/SignIn/LoginButtonGroup";
import { StyledButton } from "components/SignIn/styles";
import { useMemberSuperLogin } from "hooks/api/signin";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateLogin } = useMemberSuperLogin();

  return (
    <Layout type="page" px={16} pt={76}>
      <Text typo="title1_24_B" color="darkBlack">
        <Text as="em" typo="inherit" color="primaryColor">
          우리 강아지
        </Text>
        의 유치원
        <br /> 생활을 보러 갈까요?
      </Text>
      <LoginButtonGroup />
      <Flex align="center" justify="center">
        {/* <Link to={"서비스 체험하기"} > */}
        <Text typo="label2_14_B" color="gray_1" onClick={() => mutateLogin({ memberId: 1 })}>
          서비스 체험하기
        </Text>
        {/* </Link> */}
      </Flex>
      <Box position="absolute" left={16} right={16} bottom={24}>
        <Flex direction="column" align="center" gap={8}>
          <Text typo="label2_14_M" color="gray_2">
            <Link to={routes.policy.usage.root}>이용약관</Link> |{" "}
            <Link to={routes.policy.privacy.root}>개인정보 처리 방침</Link>
          </Text>
          <StyledButton bg="primaryColor" onClick={() => navigate(routes.admin.login.root)}>
            <Text typo="label1_16_B" color="white">
              관리자로 시작하기
            </Text>
          </StyledButton>
        </Flex>
      </Box>
    </Layout>
  );
};

export default LoginPage;
