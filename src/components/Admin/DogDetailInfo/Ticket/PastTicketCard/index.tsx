import * as S from "./styles";
import PastTicket from "../PastTicket";

import type { TicketDetailData } from "types/admin/attendance.type";

interface PastTicketCardProps {
  data: TicketDetailData[];
}

const PastTicketCard = ({ data }: PastTicketCardProps) => {
  return (
    <S.Container>
      <S.List>
        <S.ListInnerBox className="left">이용권 유형</S.ListInnerBox>
        <S.ListInnerBox>이용기간</S.ListInnerBox>
      </S.List>
      {data.map((ticket, index) => (
        <PastTicket key={index} data={ticket} />
      ))}
    </S.Container>
  );
};

export default PastTicketCard;
