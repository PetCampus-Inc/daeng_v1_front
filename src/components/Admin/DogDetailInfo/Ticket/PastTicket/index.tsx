import { ITicketDetail } from "types/Attendance.type";
import * as S from "../PastTicketCard/styles";

interface PastTicketProps {
  data: ITicketDetail;
}

const PastTicket = ({ data }: PastTicketProps) => {
  return (
    <S.List>
      <S.ListInnerBox className="left">정기권 12주</S.ListInnerBox>
      <S.ListInnerBox>{data.ticketStartDate}-2021.09.10</S.ListInnerBox>
    </S.List>
  );
};

export default PastTicket;
