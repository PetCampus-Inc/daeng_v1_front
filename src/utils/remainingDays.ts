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
