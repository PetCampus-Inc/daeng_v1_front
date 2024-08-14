import { ADMIN_NOTIFICATION_STEP } from "constants/adminNotification";

import { Box, Flex, Layout, Text } from "components/common";
import Header from "components/common/Header";
import { useState } from "react";

const AdminNotificationPage = () => {
  const currentSteps = ADMIN_NOTIFICATION_STEP;
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <Header type="text" text="알림" />
      <Layout type="main">
        <nav>
          <Flex gap={18}>
            {currentSteps.map((item, index) => (
              <Box key={item}>
                <Text typo="body1_18_B" color={index === currentStep ? "darkBlack" : "gray_3"}>
                  {item}
                </Text>
              </Box>
            ))}
          </Flex>
        </nav>
      </Layout>
    </>
  );
};

export default AdminNotificationPage;
