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
