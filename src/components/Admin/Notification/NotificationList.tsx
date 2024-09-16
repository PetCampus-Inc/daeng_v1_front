import {
  ADMIN_NOTIFICATION,
  handleChangeType,
  NotificationItem
} from "constants/adminNotification";

import { Box, Text } from "components/common";
import { useGetAlarms } from "hooks/api/admin/alarm";
import { useNavigate } from "react-router-dom";
import { IAlarmTicketResponse, IGetAlarm } from "types/admin/admin.types";
import { Role } from "types/common/role.types";

interface Props {
  currentStep: string;
}

type NotificationCategory = keyof typeof ADMIN_NOTIFICATION;

const NotificationList = ({ currentStep }: Props) => {
  const navigate = useNavigate();
  const alarmType = handleChangeType(currentStep);
  const req = {
    alarmId: 0,
    category: alarmType,
    pageable: {
      page: 0,
      size: 10,
      sort: [""]
    }
  };
  const { data } = useGetAlarms(req);

  const getFilteredAlarms = () => {
    return data
      .map((alarm) => {
        const categoryKeys = Object.keys(ADMIN_NOTIFICATION) as NotificationCategory[];
        for (const key of categoryKeys) {
          const notificationItems = ADMIN_NOTIFICATION[key];
          const matchedItem = notificationItems.find((item) => item.id === alarm.contentType);
          if (matchedItem) {
            return {
              ...matchedItem,
              createdDate: alarm.createdDate,
              dogName: alarm.dogName,
              teacherName: alarm.teacherName,
              dogId: alarm.dogId,
              teacherId: alarm.teacherId,
              schoolName: alarm.schoolName,
              ticketType: alarm.ticketResponse.ticketType,
              currentRoundTicket: alarm.ticketResponse.currentRoundTicket,
              ticketExpirationDate: alarm.ticketResponse.ticketExpirationDate
            };
          }
        }
        return null;
      })
      .filter((item): item is IGetAlarm & NotificationItem & IAlarmTicketResponse => item !== null);
  };

  const getAlarmItems = () => {
    const filteredAlarms = getFilteredAlarms();

    if (currentStep === "전체" && Role.ROLE_OWNER) {
      return filteredAlarms.filter(
        (alarm) =>
          ADMIN_NOTIFICATION.attendance.includes(alarm) ||
          ADMIN_NOTIFICATION.care.includes(alarm) ||
          ADMIN_NOTIFICATION.management.includes(alarm)
      );
    } else if (currentStep === "전체" && Role.ROLE_TEACHER) {
      return filteredAlarms.filter(
        (alarm) =>
          ADMIN_NOTIFICATION.attendance.includes(alarm) || ADMIN_NOTIFICATION.care.includes(alarm)
      );
    } else {
      const key = alarmType.toLowerCase() as NotificationCategory;
      return filteredAlarms.filter((alarm) => ADMIN_NOTIFICATION[key]?.includes(alarm)) || [];
    }
  };

  return (
    <Box gap={10} display="flex" direction="column">
      {getAlarmItems().map((item, index) => (
        <Box
          key={index}
          display="flex"
          gap={12}
          padding={12}
          borderBottom={1}
          borderColor="gray_5"
          onClick={() =>
            navigate(`${typeof item.path === "function" ? item.path(item.dogId) : item.path}`)
          }
        >
          <Box width="29px" height="29px">
            {item.icon}
          </Box>
          <Box display="flex" direction="column" gap={2}>
            <Text typo="label2_14_B" color="darkBlack">
              {typeof item.title === "function"
                ? item.title(item.dogName || item.teacherName)
                : item.title}
            </Text>
            <Text typo="label2_14_R" color="gray_1">
              {typeof item.text === "function"
                ? item.text(item.ticketType, item.ticketExpirationDate, item.ticketStartDate)
                : item.text}
            </Text>
            {item.subtext && (
              <Text typo="label2_14_R" color="gray_2">
                {typeof item.subtext === "function"
                  ? item.subtext(item.ticketType, item.ticketStartDate, item.allRoundTicket)
                  : item.subtext}
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
