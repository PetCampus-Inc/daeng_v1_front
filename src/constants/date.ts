export const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

// 1990 ~ currentYear
const currentYear = new Date().getFullYear();
export const yearsArray = Array.from({ length: currentYear - 1989 }, (_, index) =>
  (1990 + index).toString()
);

// "01" ~ "12"
export const monthsArray = Array.from({ length: 12 }, (_, index) =>
  (index + 1).toString().padStart(2, "0")
);

// "01" ~ "31"
export const daysArray = Array.from({ length: 31 }, (_, index) =>
  (index + 1).toString().padStart(2, "0")
);
