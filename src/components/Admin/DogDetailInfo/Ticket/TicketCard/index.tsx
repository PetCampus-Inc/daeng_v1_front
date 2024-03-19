import AlertSmallIcon from "assets/svg/alert-small-icon";
import CalendarIcon from "assets/svg/calendar";
import CalendarExpireIcon from "assets/svg/calendar-expire";
import RemainCountIcon from "assets/svg/remain-count-icon";
import { differenceInDays, isAfter, parseISO } from "date-fns";
import { ITicketDetail } from "types/admin.attendance.type";

import * as S from "./styles";
import SendAlermButton from "../SendAlermButton";

interface TicketCardProps {
  data: Omit<ITicketDetail, "ticketHistory">;
}

const TicketCard = ({ data }: TicketCardProps) => {
  const isRoundTicket = data?.ticketType === "ROUND";

  if (!data) {
    return <div>로딩중</div>;
  }
  // 임시 데이터
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate());

  const isSoonDeadline =
    (data.currentRoundTicket <= 3 && data.currentRoundTicket > 0) ||
    (differenceInDays(endDate, currentDate) > 0 && differenceInDays(endDate, currentDate) <= 3);
  const isNeededRenewal =
    data.currentRoundTicket === 0 ||
    // TODO: 백엔드 수정시 이 코드로 교체하기 -> isAfter(data.ticketStartDate, data.ticketExpirationDate);
    isAfter(currentDate, endDate);

  let statusIcon = <></>;
  let statusText = <></>;
  if (isRoundTicket) {
    statusIcon = isSoonDeadline ? <AlertSmallIcon color="red" /> : <RemainCountIcon />;
    statusText = (
      <S.Text className={`detail ${isSoonDeadline ? "red" : ""}`}>
        잔여횟수 : {data.currentRoundTicket || "- "}회
      </S.Text>
    );
  } else {
    statusIcon = isSoonDeadline ? <AlertSmallIcon color="red" /> : <CalendarExpireIcon />;
    statusText = (
      <S.Text className={`detail ${isSoonDeadline ? "red" : ""}`}>
        만료일 : {data.ticketExpirationDate || "없음"}
      </S.Text>
    );
  }

  return (
    <S.Container>
      {isNeededRenewal ? (
        <S.BlackCover>
          <S.RenewButton>이용권 갱신</S.RenewButton>
        </S.BlackCover>
      ) : (
        <></>
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
          {isSoonDeadline ? <SendAlermButton /> : <></>}
        </S.IconWrapper>

        <S.IconWrapper>
          <CalendarIcon />
          <S.Text className="detail">유치원 등원 요일 : {data!.attendanceDays.join(", ")}</S.Text>
        </S.IconWrapper>
      </S.InnerBox>
    </S.Container>
  );
};

export default TicketCard;
