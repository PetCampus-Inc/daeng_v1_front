import CalendarIcon from "assets/svg/calendar";
import * as S from "./styles";
import RemainCountIcon from "assets/svg/remain-count-icon";
import SendAlermButton from "../SendAlermButton";

const TicketCard = () => {
  return (
    <S.Container>
      <S.InnerBox className="upper">
        <S.Text className="ticket">회차권</S.Text>
        <S.Text className="count">20회</S.Text>
      </S.InnerBox>
      <S.InnerBox className="lower">
        <S.IconWrapper className="upper">
          <S.IconWrapper>
            <RemainCountIcon />
            <S.Text className="detail">잔여횟수 : 3회</S.Text>
          </S.IconWrapper>

          <SendAlermButton />
        </S.IconWrapper>

        <S.IconWrapper>
          <CalendarIcon />
          <S.Text className="detail">유치원 등원 요일 : 월, 목, 토</S.Text>
        </S.IconWrapper>
      </S.InnerBox>
    </S.Container>
  );
};

export default TicketCard;
