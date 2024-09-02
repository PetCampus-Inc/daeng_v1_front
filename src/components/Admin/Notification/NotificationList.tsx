import { ADMIN_NOTIFICATION, handleChangeType } from "constants/adminNotification";

import { Box, Text } from "components/common";
import { useGetAlarms } from "hooks/api/admin/alarm";
import { Role } from "types/common/role.types";

interface Props {
  currentStep: string;
  adminId: number;
  role: string;
}

type NotificationCategory = keyof typeof ADMIN_NOTIFICATION;

const NotificationList = ({ currentStep, adminId, role }: Props) => {
  const alarmType = handleChangeType(currentStep);
  const req = {
    alarmId: 0,
    category: alarmType,
    adminId: adminId,
    pageable: {
      page: 0
    }
  };
  // const { data } = useGetAlarms(req);
  const getAlarmItems = () => {
    if (currentStep === "전체" && role === Role.ROLE_OWNER) {
      return [
        ...ADMIN_NOTIFICATION.attendance,
        ...ADMIN_NOTIFICATION.care,
        ...ADMIN_NOTIFICATION.management
      ];
    } else if (currentStep === "전체" && role === Role.ROLE_TEACHER) {
      return [...ADMIN_NOTIFICATION.attendance, ...ADMIN_NOTIFICATION.care];
    } else {
      const key = alarmType.toLowerCase() as NotificationCategory;
      return ADMIN_NOTIFICATION[key] || [];
    }
  };
  const name = "";

  return (
    <Box gap={10} display="flex" direction="column">
      {getAlarmItems().map((item, index) => (
        <Box key={index} display="flex" gap={12} padding={12} borderBottom={1} borderColor="gray_5">
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
