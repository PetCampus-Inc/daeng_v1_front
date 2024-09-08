import AlertFilledIcon from "assets/svg/alert-filled-icon";
import CalendarIcon from "assets/svg/calendar";
import CalendarExpireIcon from "assets/svg/calendar-expire";
import RemainCountIcon from "assets/svg/remain-count-icon";
import NewTicketBottomSheet from "components/Admin/DogDetailInfo/Ticket/NewTicketBottomSheet";
import SendAlarmButton from "components/Admin/DogDetailInfo/Ticket/SendAlarmButton";
import { Flex, Text } from "components/common";
import { MidButton } from "components/common/Button/Templates";
import { format, differenceInDays } from "date-fns";
import { useOverlay } from "hooks/common/useOverlay";
import { useMemo } from "react";
import { checkMonthlyTicketStatus, checkRoundTicketStatus } from "utils/remainingDays";

import { CardContainer, CardInnerBox, Dimmed } from "./styles";

import type { TicketDetailData } from "types/admin/attendance.type";
interface TicketCardProps {
  dogId: number;
  data: TicketDetailData;
}

export function TicketCard({ dogId, data }: TicketCardProps) {
  const overlay = useOverlay();
  const { icon, statusText, textColor, isExpiringSoon, isExpired } = useMemo(() => {
    return data.ticketType === "ROUND"
      ? getRoundTicketDetails(data.currentRoundTicket)
      : getMonthlyTicketDetails(data.ticketExpirationDate);
  }, [data]);

  const openPopup = () =>
    overlay.open(({ isOpen, close }) => (
      <NewTicketBottomSheet isOpen={isOpen} close={close} info={{ ...data, dogId }} />
    ));

  return (
    <CardContainer>
      {isExpired && (
        <Dimmed>
          <MidButton onClick={openPopup}>이용권 갱신</MidButton>
        </Dimmed>
      )}
      <CardInnerBox className="upper">
        <Text typo="caption1_12_B" color="primaryColor">
          {data.ticketType === "ROUND" ? "회차권" : "정기권"}
        </Text>
        <Text typo="body1_18_B" color="darkBlack">
          {data.ticketType === "ROUND"
            ? `${data.allRoundTicket}회`
            : `${data.monthlyTicketNumber}주`}
        </Text>
      </CardInnerBox>
      <CardInnerBox className="lower">
        <Flex align="center" justify="space-between">
          <Flex gap={4} align="center">
            {icon}
            <Text typo="label2_14_R" color={textColor}>
              {statusText}
            </Text>
          </Flex>
          {isExpiringSoon && <SendAlarmButton />}
        </Flex>
        <Flex gap={4} align="center">
          <CalendarIcon w="24" h="24" />
          <Text typo="label2_14_R" color="gray_1">
            유치원 등원 요일: {data.attendanceDays?.join(".") || "미지정"}
          </Text>
        </Flex>
      </CardInnerBox>
    </CardContainer>
  );
}

type TextColor = "red_1" | "gray_1";

type TicketDetails = {
  icon: JSX.Element;
  statusText: string;
  textColor: TextColor;
  isExpiringSoon: boolean;
  isExpired: boolean;
};

// 회차권의 잔여 횟수를 기준으로 유형의 아이콘, 텍스트, 이용권 유효상태를 반환하는 함수
function getRoundTicketDetails(currentRoundTicket: number): TicketDetails {
  const status = checkRoundTicketStatus(currentRoundTicket);
  return {
    icon: status.isExpired ? (
      <CalendarExpireIcon w="24" h="24" />
    ) : status.isExpiringSoon ? (
      <AlertFilledIcon colorScheme="red" w="24" h="24" />
    ) : (
      <RemainCountIcon w="24" h="24" />
    ),
    statusText: `잔여횟수: ${currentRoundTicket}회`,
    textColor: status.isExpired || status.isExpiringSoon ? "red_1" : "gray_1",
    isExpiringSoon: status.isExpiringSoon,
    isExpired: status.isExpired
  };
}

// 정기권의 만료일을 기준으로 유형의 아이콘, 텍스트, 이용권 유효상태를 반환하는 함수
function getMonthlyTicketDetails(ticketExpirationDate: number[] | null): TicketDetails {
  if (!ticketExpirationDate) {
    return {
      icon: <CalendarExpireIcon w="24" h="24" />,
      statusText: "만료일: N/A",
      textColor: "red_1",
      isExpiringSoon: false,
      isExpired: true
    };
  }

  const expirationDate = new Date(
    ticketExpirationDate[0],
    ticketExpirationDate[1] - 1,
    ticketExpirationDate[2]
  );
  const daysUntilExpiration = differenceInDays(expirationDate, new Date());
  const status = checkMonthlyTicketStatus([
    expirationDate.getFullYear(),
    expirationDate.getMonth() + 1,
    expirationDate.getDate()
  ]);
  return {
    icon: status.isExpired ? (
      <CalendarExpireIcon w="24" h="24" />
    ) : status.isExpiringSoon ? (
      <AlertFilledIcon colorScheme="red" />
    ) : (
      <CalendarExpireIcon w="24" h="24" />
    ),
    statusText:
      `만료일: ${format(expirationDate, "yyyy.MM.dd")}` +
      (status.isExpiringSoon ? ` (만료 ${daysUntilExpiration}일전)` : ""),
    textColor: status.isExpired || status.isExpiringSoon ? "red_1" : "gray_1",
    isExpiringSoon: status.isExpiringSoon,
    isExpired: status.isExpired
  };
}
