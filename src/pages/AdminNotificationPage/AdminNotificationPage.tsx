import { ADMIN_NOTIFICATION_STEP } from "constants/adminNotification";

import EllipseOrangeIcon from "assets/svg/ellipse-orange-icon";
import NotificationList from "components/Admin/Notification/NotificationList";
import { Box, Layout, Text } from "components/common";
import Header from "components/common/Header";
import { useState } from "react";

const AdminNotificationPage = () => {
  const currentSteps = ADMIN_NOTIFICATION_STEP;
  const [currentStep, setCurrentStep] = useState(0);
  const [isNewNotification, setIsNewNotification] = useState(true);

  return (
    <>
      <Header type="text" text="알림" />
      <Layout type="main">
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
                {index !== 0 && isNewNotification && (
                  <Box position="absolute" top={-5} right={-8}>
                    <EllipseOrangeIcon />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </nav>
        {isNewNotification ? (
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
