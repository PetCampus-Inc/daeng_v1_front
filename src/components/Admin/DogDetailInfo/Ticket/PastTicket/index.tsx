import { ITicketDetail } from "types/admin.attendance.type";
import { addZero } from "utils/date";

import * as S from "../PastTicketCard/styles";

interface PastTicketProps {
  data: ITicketDetail;
}

const PastTicket = ({ data }: PastTicketProps) => {
  const ticketType = data.ticketType === "ROUND" ? "회차권" : "정기권";
  return (
    <S.List>
      <S.ListInnerBox className="left">{ticketType}</S.ListInnerBox>
      <S.ListInnerBox>
        {data.ticketStartDate && (addZero(data.ticketStartDate) as number[]).join(".")}
        {" - "}
        {data.ticketExpirationDate && (addZero(data.ticketExpirationDate) as number[]).join(".")}
      </S.ListInnerBox>
    </S.List>
  );
};

export default PastTicket;
