import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

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
  if (Array.isArray(num)) return num.map((n) => (n < 10 ? `0${n}` : n.toString()));
  return num < 10 ? `0${num}` : num.toString();
};

/**
 * @description 현재 시간부터 주어진 날짜까지의 거리를 표시하는 함수
 * @param {string} str
 * @returns {string} 1일, 2일, 3일...
 */
export const getDaysAgo = (str: string): string => {
  const date = parseISO(str);
  return formatDistanceToNow(date, { locale: ko });
};
