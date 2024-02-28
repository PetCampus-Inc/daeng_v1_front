import * as S from "./styles";
import CalendarIcon from "assets/svg/calendar";
import RemainCountIcon from "assets/svg/remain-count-icon";
import SendAlermButton from "../SendAlermButton";
import { ITicketDetail } from "types/Attendance.type";
import CalendarExpireIcon from "assets/svg/calendar-expire";

interface TicketCardProps {
  data: Omit<ITicketDetail, "ticketHistory">;
}

const TicketCard = ({ data }: TicketCardProps) => {
  const isRoundTicket = data?.ticketType === "ROUND";

  return (
    <S.Container>
      <S.InnerBox className="upper">
        <S.Text className="ticket">{isRoundTicket ? "회차권" : "정기권"}</S.Text>
        <S.Text className="count">
          {isRoundTicket ? `${data.allRoundTicket}회` : `${data.monthlyTicketNumber}주`}
        </S.Text>
      </S.InnerBox>
      <S.InnerBox className="lower">
        <S.IconWrapper className="upper">
          {isRoundTicket ? (
            <S.IconWrapper>
              <RemainCountIcon />
              <S.Text className="detail">잔여횟수 : {data.currentRoundTicket}회</S.Text>
            </S.IconWrapper>
          ) : (
            <S.IconWrapper>
              <CalendarExpireIcon />
              <S.Text className="detail">만료일 : {data.ticketExpirationDate || "없음"}</S.Text>
            </S.IconWrapper>
          )}

          <SendAlermButton />
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
