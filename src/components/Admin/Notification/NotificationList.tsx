import { ADMIN_NOTIFICATION } from "constants/adminNotification";

import { Box, Text } from "components/common";

interface Props {
  currentStep: number;
  name: string;
}

const NotificationList = ({ currentStep, name }: Props) => {
  //FIXME: 몇분전 시간 수정필요
  return (
    <Box gap={10} display="flex" direction="column">
      {ADMIN_NOTIFICATION.common.map((item, index) => (
        <Box key={index} display="flex" gap={12} padding={20} borderBottom={1} borderColor="gray_5">
          <Box width="29px" height="29px">
            {item.icon}
          </Box>
          <Box display="flex" direction="column" gap={2}>
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
            <Text typo="caption1_12_R" color="gray_3">
              27분전
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default NotificationList;
