import { format } from "date-fns";

/**
 * 현재 날짜를 'yyyyMMdd' 형식의 문자열로 반환하는 함수
 */
export const getCurrentDate = () => {
  return format(new Date(), "yyyyMMdd");
};

/**
 * 한 자리 숫자를 두 자리 숫자로 변환하는 함수
 */
export const addZero = (num: number | number[]) => {
  if (Array.isArray(num)) return num.map((n) => (n < 10 ? `0${n}` : n));
  return num < 10 ? `0${num}` : num;
};
