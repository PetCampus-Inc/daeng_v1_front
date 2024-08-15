import { differenceInDays } from "date-fns";

export interface TicketStatus {
  isExpired: boolean;
  isExpiringSoon: boolean;
  isValid: boolean;
}

/**
 * currentRounds - 현재 남은 회차 수
 */
export interface RoundTicketInfo {
  currentRounds: number;
}

/**
 * expirationDate - 정기권의 만료일. null인 경우 만료일 정보 없음
 */
export interface MonthlyTicketInfo {
  expirationDate: Date | null;
}

/**
 * 회차권의 상태를 계산하는 함수
 * @param {RoundTicketInfo} info - 회차권 정보
 * @returns {TicketStatus} 계산된 티켓 상태
 */
export function getRoundTicketStatus(info: RoundTicketInfo): TicketStatus {
  return {
    isExpired: info.currentRounds === 0,
    isExpiringSoon: info.currentRounds > 0 && info.currentRounds <= 2,
    isValid: info.currentRounds > 2
  };
}

/**
 * 정기권의 상태를 계산하는 함수
 * @param {MonthlyTicketInfo} info - 정기권 정보
 * @returns {TicketStatus} 계산된 티켓 상태
 */
export function getMonthlyTicketStatus(info: MonthlyTicketInfo): TicketStatus {
  if (!info.expirationDate) {
    return { isExpired: true, isExpiringSoon: false, isValid: false };
  }

  const today = new Date();
  const daysUntilExpiration = differenceInDays(info.expirationDate, today);

  return {
    isExpired: daysUntilExpiration < 0,
    isExpiringSoon: daysUntilExpiration >= 0 && daysUntilExpiration <= 3,
    isValid: daysUntilExpiration > 3
  };
}
