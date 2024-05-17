// MEMO expiration 데이터가 없고 monthlyNumber로 계산하는 경우 (주수)
export const remainingDays = (StartDate: number[], monthlyNumber: number) => {
  // 등록 날짜
  const startDate = new Date(StartDate[0], StartDate[1] - 1, StartDate[2]);
  // 현재 날짜
  const currentData = new Date();

  const elapsedTime = currentData.getTime() - startDate.getTime();
  const elapsedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

  const totalDays = monthlyNumber * 7;
  const remainingDays = totalDays - elapsedDays;

  return remainingDays;
};

// MEMO expiration 데이터가 있는 경우
export const remainingDaysDogInfo = (expirationArr: number[] | null) => {
  if (!expirationArr) return null;

  const [year, month, day] = expirationArr;
  // 마감 날짜
  const expirationDate = new Date(year, month - 1, day);
  // 현재 날짜
  const currentDate = new Date();

  const elapsedTime = expirationDate.getTime() - currentDate.getTime();
  const remainingDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24)) + 1;

  return remainingDays;
};
