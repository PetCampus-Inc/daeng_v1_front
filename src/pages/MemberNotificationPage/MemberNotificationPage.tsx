import { ADMIN_NOTIFICATION_STEP } from "constants/adminNotification";

import EllipseOrangeIcon from "assets/svg/ellipse-orange-icon";
import { useAlertSetting } from "components/Admin/MyPage/AlertSetting/context/AlertSettingProvider";
import NotificationList from "components/Admin/Notification/NotificationList";
import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import { useGetMemberNewAlarm } from "hooks/api/member/alarm";
import { useState } from "react";
import { Role } from "types/common/role.types";

//FIXME: 전달 데이터 수정 필요
const MemberNotificationPage = () => {
  //   const { alertSettings, isAllOn } = useAlertSetting();
  // dogId 삭제예정
  const dogId = 1;
  const { data } = useGetMemberNewAlarm(dogId);

  const currentSteps = Role.ROLE_OWNER
    ? ADMIN_NOTIFICATION_STEP
    : ADMIN_NOTIFICATION_STEP.slice(0, 3);
  const [currentStep, setCurrentStep] = useState(String(ADMIN_NOTIFICATION_STEP[0]));

  return (
    <>
      <Header type="text" text="알림" />
      <Layout type="detail">
        {/* <nav>
          <Box display="flex" gap={20} mt={25} paddingX={15} borderBottom={2} borderColor="gray_5">
            {currentSteps.map((item, index) => (
              <Box
                key={item}
                paddingBottom={10}
                position="relative"
                onClick={() => setCurrentStep(item)}
              >
                <Text typo="body1_18_B" color={item === currentStep ? "darkBlack" : "gray_3"}>
                  {item}
                </Text>
                <Box
                  position="absolute"
                  bottom={-2}
                  right={0}
                  left={0}
                  borderBottom={2}
                  borderColor={item === currentStep ? "darkBlack" : "transparent"}
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
        {data.newAlarm ? (
          <NotificationList currentStep={currentStep} />
        ) : (
          <Box display="flex" justify="center" pt={80}>
            <Text typo="label2_14_R" color="gray_2">
              도착한 알림이 없어요
            </Text>
          </Box>
        )} */}
      </Layout>
    </>
  );
};

export default MemberNotificationPage;
