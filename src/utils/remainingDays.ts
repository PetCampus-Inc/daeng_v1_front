/**
 *  expirationDate(마감일)가 없고 monthlyNumber로 계산하는 경우 (주수) 마감일 계산
 * @param startDateArr
 * @param monthlyNumber
 * @returns
 */
export const remainingDays = (startDateArr: number[], monthlyNumber: number) => {
  // 등록 날짜
  const [year, month, day] = startDateArr;
  const startDate = new Date(year, month - 1, day);
  // 현재 날짜
  const currentData = new Date();

  const elapsedTime = currentData.getTime() - startDate.getTime();
  const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

  const totalDays = monthlyNumber * 7;
  const remainingDays = totalDays - elapsedDays;

  return remainingDays;
};

/**
 * expirationDate(마감일)가 있는 경우 마감일 계산
 * @param expirationArr
 * @returns
 */
export const remainingExpirationDays = (expirationArr: number[] | null) => {
  if (!expirationArr) return null;

  // 마감 날짜
  const [year, month, day] = expirationArr;
  const expirationDate = new Date(year, month - 1, day);
  // 현재 날짜
  const currentDate = new Date();

  const elapsedTime = expirationDate.getTime() - currentDate.getTime();
  const remainingDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24)) + 1;

  return remainingDays;
};

type TicketValidationResult = {
  isExpired: boolean;
  isExpiringSoon: boolean;
  isValid: boolean;
};

/**
 * @description 회차권 유효 상태를 확인하는 함수
 * @param round
 * @returns
 */
export const checkRoundTicketStatus = (round: number): TicketValidationResult => {
  return {
    isExpired: round === 0,
    isExpiringSoon: round > 0 && round < 3,
    isValid: round >= 3
  };
};

/**
 * @description 정기권 유효 상태를 확인하는 함수
 * @param monthlyTicket
 * @returns
 */
export const checkMonthlyTicketStatus = (monthlyTicket: number[]): TicketValidationResult => {
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
