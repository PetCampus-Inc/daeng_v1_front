import { ITicketDetail } from "types/admin/attendance.type";
import { addZero } from "utils/date";

import * as S from "../PastTicketCard/styles";

interface PastTicketProps {
  data: ITicketDetail;
}

const PastTicket = ({ data }: PastTicketProps) => {
  const ticketInfo = (ticketType: string) => {
    switch (ticketType) {
      case "ROUND":
        return `회차권 ${data.allRoundTicket}회`;
      case "MONTHLY":
        return `정기권 ${data.monthlyTicketNumber}주`;
      default:
        return "-";
    }
  };
  return (
    <S.List>
      <S.ListInnerBox className="left">{ticketInfo(data.ticketType)}</S.ListInnerBox>
      <S.ListInnerBox>
        {data.ticketStartDate && (addZero(data.ticketStartDate) as string[]).join(".")}
        {" - "}
        {data.ticketExpirationDate && (addZero(data.ticketExpirationDate) as string[]).join(".")}
      </S.ListInnerBox>
    </S.List>
  );
};

export default PastTicket;
