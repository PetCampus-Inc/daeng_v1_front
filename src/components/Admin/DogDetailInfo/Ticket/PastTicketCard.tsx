import { Box } from "components/common";
import { getPadString } from "utils/date";

import { Cell, TableContainer, TableRow, TableHeader } from "./styles";

import type { TicketDetailData } from "types/admin/attendance.type";

interface PastTicketCardProps {
  data: TicketDetailData[];
}

export function PastTicketCard({ data }: PastTicketCardProps) {
  const ticketInfo = (ticket: TicketDetailData) => {
    switch (ticket.ticketType) {
      case "ROUND":
        return `회차권 ${ticket.allRoundTicket}회`;
      case "MONTHLY":
        return `정기권 ${ticket.monthlyTicketNumber}주`;
      default:
        return "-";
    }
  };

  return (
    <TableContainer>
      <TableHeader>
        <Cell>이용권 유형</Cell>
        <Cell>이용기간</Cell>
      </TableHeader>
      {data.map((ticket, index) => (
        <Box px={12} key={index}>
          <TableRow>
            <Cell>{ticketInfo(ticket)}</Cell>
            <Cell>
              {ticket.ticketStartDate && getPadString(ticket.ticketStartDate).join(".")}
              {ticket.ticketExpirationDate &&
                " - " + getPadString(ticket.ticketExpirationDate).join(".")}
            </Cell>
          </TableRow>
        </Box>
      ))}
    </TableContainer>
  );
}
