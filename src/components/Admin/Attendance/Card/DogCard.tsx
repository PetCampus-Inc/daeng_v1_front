import AlertFilledIcon from "assets/svg/alert-filled-icon";
import CalendarIcon from "assets/svg/calendar";
import { useTokenHandler } from "hooks/common/useTokenHandler";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { padToTwoDigits } from "utils/date";
import {
  getMonthlyTicketStatus,
  getRoundTicketStatus,
  type TicketStatus
} from "utils/ticketStatus";

import * as S from "./styles";
import { CardOptionsMenu } from "../Button/CardOptionsMenu";
import { CARD_OPTIONS, type CardOptions } from "../constant";

import type { Attendance } from "types/admin/attendance.type";

export function DogCard({ info }: { info: Attendance }) {
  const navigate = useNavigate();
  const { role: adminRole } = useTokenHandler();

  const ticketStatus = useMemo(() => checkTicketStatus(info), [info]);

  const handleCardClick = () => {
    const params = new URLSearchParams({
      dog_name: info.dogName,
      ticket_status: ticketStatus.isExpired.toString()
    });
    navigate(`${info.dogId}?${params}`);
  };

  const availableOptions = useMemo(
    () => getAvailableOptions(ticketStatus, adminRole),
    [ticketStatus, adminRole]
  );

  const ticketStatusText = getTicketStatusText(info);

  return (
    <S.CardContainer onClick={handleCardClick}>
      <S.ImageWrapper isExpired={ticketStatus.isExpired}>
        <S.Image
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={`${info.dogName}의 프로필 사진`}
        />
      </S.ImageWrapper>
      <S.InfoWrapper>
        <S.DogName typo="body2_16_B" isExpired={ticketStatus.isExpired}>
          {info.dogName}
        </S.DogName>
        <S.Info $status={getStatusStyle(ticketStatus)}>
          <S.Icon>
            {ticketStatus.isExpiringSoon && <AlertFilledIcon colorScheme="brown" />}
            {ticketStatus.isExpired && <AlertFilledIcon colorScheme="gray" />}
            {ticketStatus.isValid && <CalendarIcon className="calendar-icon" />}
          </S.Icon>
          <span>{ticketStatusText}</span>
        </S.Info>
      </S.InfoWrapper>
      {adminRole && availableOptions.length > 0 && (
        <CardOptionsMenu options={availableOptions} dogId={info.dogId} />
      )}
    </S.CardContainer>
  );
}

function checkTicketStatus(info: Attendance): TicketStatus {
  if (info.monthlyTicket) {
    const [year, month, day] = info.monthlyTicket;
    const expirationDate = new Date(year, month - 1, day);
    return getMonthlyTicketStatus({ expirationDate });
  } else {
    return getRoundTicketStatus({ currentRounds: info.currentRounds || 0 });
  }
}

function getTicketStatusText(info: Attendance): string {
  if (info.monthlyTicket) {
    const [year, month, day] = padToTwoDigits(info.monthlyTicket);
    return `${year}.${month}.${day} 만료`;
  } else {
    return `잔여 ${info.currentRounds}/${info.allRounds}회`;
  }
}

function getStatusStyle(status: TicketStatus): "expiringSoon" | "expired" | "valid" {
  if (status.isExpiringSoon) return "expiringSoon";
  if (status.isExpired) return "expired";
  return "valid";
}

function getAvailableOptions(ticketStatus: TicketStatus, adminRole: string): CardOptions[] {
  const options = [
    { option: CARD_OPTIONS.CALL, condition: () => true },
    { option: CARD_OPTIONS.SEND_ALARM, condition: () => ticketStatus.isExpiringSoon },
    { option: CARD_OPTIONS.DELETE, condition: () => adminRole === "ROLE_OWNER" }
  ];

  return options.filter(({ condition }) => condition()).map(({ option }) => option);
}
