import { ADMIN_NOTIFICATION_STEP } from "constants/adminNotification";

import EllipseOrangeIcon from "assets/svg/ellipse-orange-icon";
import { useAlertSetting } from "components/Admin/MyPage/AlertSetting/context/AlertSettingProvider";
import NotificationList from "components/Admin/Notification/NotificationList";
import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import useGetNewAlarm from "hooks/api/admin/alarm";
import { useAdminInfo } from "hooks/common/useAdminInfo";
import { useState } from "react";

//FIXME: 전달 데이터 수정 필요
const AdminNotificationPage = () => {
  const { alertSettings, isAllOn, toggleAll, toggleIndividual } = useAlertSetting();
  const { adminId } = useAdminInfo();
  //FIXME: data.newalarm 으로 수정 확인
  const { data } = useGetNewAlarm(adminId);
  const { role } = useAdminInfo();
  const currentSteps =
    role === "ROLE_OWNER" ? ADMIN_NOTIFICATION_STEP : ADMIN_NOTIFICATION_STEP.slice(0, 3);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <Header type="text" text="알림" />
      <Layout type="detail">
        <nav>
          <Box display="flex" gap={20} mt={25} paddingX={15} borderBottom={2} borderColor="gray_5">
            {currentSteps.map((item, index) => (
              <Box
                key={item}
                paddingBottom={10}
                position="relative"
                onClick={() => setCurrentStep(index)}
              >
                <Text typo="body1_18_B" color={index === currentStep ? "darkBlack" : "gray_3"}>
                  {item}
                </Text>
                <Box
                  position="absolute"
                  bottom={-2}
                  right={0}
                  left={0}
                  borderBottom={2}
                  borderColor={index === currentStep ? "darkBlack" : "transparent"}
                />
                {index !== 0 && data && (
                  <Box position="absolute" top={-5} right={-8}>
                    <EllipseOrangeIcon />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </nav>
        {data ? (
          <NotificationList currentStep={currentStep} name="김똑똑" />
        ) : (
          <Box display="flex" justify="center" pt={80}>
            <Text typo="label2_14_R" color="gray_2">
              도착한 알림이 없어요
            </Text>
          </Box>
        )}
      </Layout>
    </>
  );
};

export default AdminNotificationPage;
