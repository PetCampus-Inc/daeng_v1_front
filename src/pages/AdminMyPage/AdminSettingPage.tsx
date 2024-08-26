import ArrowRightIcon from "assets/svg/arrow-right-icon";
import AlertSetting from "components/Admin/MyPage/AlertSetting";
import { AlertSettingProvider } from "components/Admin/MyPage/AlertSetting/context/AlertSettingProvider";
import DeleteAccount from "components/Admin/MyPage/DeleteAccount";
import PolicySetting from "components/Admin/MyPage/PolicySetting";
import { Box, Flex, Layout, Text } from "components/common";
import { Button } from "components/common/Button";
import Header from "components/common/Header";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import useStep from "hooks/common/useStep";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSettingPage = () => {
  const navigate = useNavigate();
  const { currentStep, setStep } = useStep(3);
  //FIXME: 업데이트 유무 리팩토링 필요!
  const [isNeedUpdate, setIsNeedUpdate] = useState(false);
  const { role } = useAdminInfo();

  return (
    <>
      {currentStep === 0 && (
        <>
          <Header type="text" text="설정" />
          <Layout type="detail" pt="0.3rem" paddingX="1rem">
            <Box
              display="flex"
              height="56px"
              justify="space-between"
              align="center"
              borderBottom={1}
              borderColor="gray_5"
              onClick={() => setStep(1)}
            >
              <Text typo="body2_16_R" color="gray_1">
                알림 설정
              </Text>
              <ArrowRightIcon colorScheme="gray_3" w="20" />
            </Box>
            <Box
              display="flex"
              height="56px"
              justify="space-between"
              align="center"
              borderBottom={1}
              borderColor="gray_5"
              onClick={() => setStep(2)}
            >
              <Text typo="body2_16_R" color="gray_1">
                정책
              </Text>
              <ArrowRightIcon colorScheme="gray_3" w="20" />
            </Box>
            <Box
              display="flex"
              direction="column"
              height="92px"
              justify="center"
              borderBottom={1}
              borderColor="gray_5"
            >
              <Flex justify="space-between">
                <Text typo="body2_16_R" color="gray_1">
                  버전정보 및 업데이트
                </Text>
                {isNeedUpdate && (
                  <Button variant="pill" colorScheme="primary" typo="caption1_12_B" size="xs">
                    업데이트 하기
                  </Button>
                )}
              </Flex>
              <Text typo="caption1_12_R" color={isNeedUpdate ? "primaryColor" : "gray_2"}>
                {isNeedUpdate ? "업데이트가 필요합니다" : "가장 최신 버전입니다"}
              </Text>
              <Text typo="caption1_12_R" color="gray_2">
                똑독 2.0
              </Text>
            </Box>
            <Box
              display="flex"
              height="56px"
              justify="space-between"
              align="center"
              borderBottom={1}
              borderColor="gray_5"
              onClick={() => setStep(3)}
            >
              <Text typo="body2_16_R" color="gray_1">
                탈퇴하기
              </Text>
              <ArrowRightIcon colorScheme="gray_3" w="20" />
            </Box>
          </Layout>
        </>
      )}
      {currentStep === 1 && (
        <AlertSettingProvider>
          <AlertSetting setStep={setStep} role={role} />
        </AlertSettingProvider>
      )}
      {currentStep === 2 && <PolicySetting setStep={setStep} />}
      {currentStep === 3 && <DeleteAccount setStep={setStep} role={role} />}
    </>
  );
};

export default AdminSettingPage;
