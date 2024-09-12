import { routes } from "constants/path";

import { Layout, Text } from "components/common";
import { BottomButton } from "components/common/Button";
import { useNavigate } from "react-router-dom";

const AdminDeleteCompletePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Layout bgColor="white" px={16} pt={76}>
        <Text as="h2" typo="title1_24_B" color="darkBlack">
          <Text as="em" typo="inherit" color="primaryColor">
            탈퇴
          </Text>
          가 완료되었습니다
        </Text>
        <Text color="gray_3">똑독 유치원에서 다시 만날 날을 기다릴게요</Text>
      </Layout>
      <BottomButton onClick={() => navigate(routes.login.root)}>로그인 화면으로 이동</BottomButton>
    </>
  );
};

export default AdminDeleteCompletePage;
