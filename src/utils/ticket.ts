type TicketValidationResult = {
  isExpired: boolean;
  isExpiringSoon: boolean;
  isValid: boolean;
};

type MonthlyTicket = number[];

export const checkRoundTicketStatus = (round: number): TicketValidationResult => {
  return {
    isExpired: round === 0,
    isExpiringSoon: round > 0 && round < 3,
    isValid: round >= 3
  };
};

export const checkMonthlyTicketStatus = (monthlyTicket: MonthlyTicket): TicketValidationResult => {
  const today = new Date();
  const expirationDate = new Date(monthlyTicket[0], monthlyTicket[1] - 1, monthlyTicket[2]);

  const diffInTime = expirationDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

  return {
    isExpired: diffInDays < 0,
    isExpiringSoon: diffInDays >= 0 && diffInDays <= 2,
    isValid: diffInDays > 2
  };
};
