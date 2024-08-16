import { ADMIN_NOTIFICATION } from "constants/adminNotification";

import { Box, Text } from "components/common";

interface Props {
  currentStep: number;
  name: string;
}

const NotificationList = ({ currentStep, name }: Props) => {
  return (
    <Box gap={10} display="flex" direction="column">
      {ADMIN_NOTIFICATION.common.map((item) => (
        <Box display="flex" gap={12} padding={20}>
          <Box>{item.icon}</Box>
          <Box display="flex" direction="column">
            <Text typo="label2_14_B" color="darkBlack">
              {typeof item.title === "function" ? item.title(name) : item.title}
            </Text>
            <Text typo="label2_14_R" color="gray_1">
              {typeof item.text === "function" ? item.text(name) : item.text}
            </Text>
            {item.subtext && (
              <Text typo="label2_14_R" color="gray_2">
                {typeof item.subtext === "function" ? item.subtext(name) : item.subtext}
              </Text>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default NotificationList;
