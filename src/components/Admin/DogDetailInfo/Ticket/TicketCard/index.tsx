import AlertSmallIcon from "assets/svg/alert-small-icon";
import CalendarIcon from "assets/svg/calendar";
import CalendarExpireIcon from "assets/svg/calendar-expire";
import RemainCountIcon from "assets/svg/remain-count-icon";
import { differenceInDays, isAfter, parseISO } from "date-fns";
import useBottomSheet from "hooks/common/useBottomSheet";
import { ITicketDetail } from "types/admin.attendance.type";
import { addZero } from "utils/date";

import * as S from "./styles";
import NewTicketBottomSheet from "../NewTicketBotomSheet.tsx";
import SendAlermButton from "../SendAlermButton";

interface TicketCardProps {
  data: Omit<ITicketDetail, "ticketHistory">;
}

const TicketCard = ({ data }: TicketCardProps) => {
  const { isVisible, open, close } = useBottomSheet();
  const isRoundTicket = data?.ticketType === "ROUND";

  if (!data) {
    return <div>로딩중</div>;
  }

  const currentDate = new Date();
  const ticketStartDate = data.ticketStartDate
    ? (addZero(data.ticketStartDate) as string[]).join(".")
    : "";
  const ticketEndDate = data.ticketExpirationDate
    ? (addZero(data.ticketExpirationDate) as string[]).join(".")
    : "";

  const isSoonDeadline =
    (data.currentRoundTicket <= 3 && data.currentRoundTicket > 0) ||
    (differenceInDays(ticketEndDate, currentDate) > 0 &&
      differenceInDays(ticketEndDate, currentDate) <= 3);
  const isNeededRenewal = data.currentRoundTicket === 0 || isAfter(ticketStartDate, ticketEndDate);

  let statusIcon = <></>;
  let statusText = <></>;
  if (isRoundTicket) {
    statusIcon = isSoonDeadline ? <AlertSmallIcon color="red" /> : <RemainCountIcon />;
    statusText = (
      <S.Text className={`detail ${isSoonDeadline ? "red" : ""}`}>
        잔여횟수 : {data.currentRoundTicket || " - "}회
      </S.Text>
    );
  } else {
    statusIcon = isSoonDeadline ? <AlertSmallIcon color="red" /> : <CalendarExpireIcon />;
    statusText = (
      <S.Text className={`detail ${isSoonDeadline ? "red" : ""}`}>
        만료일 : {ticketEndDate || "없음"}
      </S.Text>
    );
  }

  return (
    <S.Container>
      <NewTicketBottomSheet isVisible={isVisible} close={close} currentData={data} />

      {isNeededRenewal && (
        <S.BlackCover onClick={open}>
          <S.RenewButton>이용권 갱신</S.RenewButton>
        </S.BlackCover>
      )}
      <S.InnerBox className="upper">
        <S.Text className="ticket">{isRoundTicket ? "회차권" : "정기권"}</S.Text>
        <S.Text className="count">
          {isRoundTicket ? `${data.allRoundTicket}회` : `${data.monthlyTicketNumber}주`}
        </S.Text>
      </S.InnerBox>
      <S.InnerBox className="lower">
        <S.IconWrapper className="upper">
          <S.IconWrapper>
            {statusIcon}
            {statusText}
          </S.IconWrapper>
          {isSoonDeadline && <SendAlermButton />}
        </S.IconWrapper>

        <S.IconWrapper>
          <CalendarIcon />
          <S.Text className="detail">
            유치원 등원 요일 : {data.attendanceDays?.join(", ") ?? "미지정"}
          </S.Text>
        </S.IconWrapper>
      </S.InnerBox>
    </S.Container>
  );
};

export default TicketCard;
