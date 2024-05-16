import { format, formatDistanceToNow, intervalToDuration, parseISO } from "date-fns";
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

/**
 * @description 시간을 '방금 전/n분 전/n시간 전' 형식으로 반환하는 함수
 * @param number[] timestampArray
 * @returns 방금 전, n분 전, n시간 전
 */
export const changeDateToString = (timestampArray: number[]) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const date = new Date(...timestampArray);
  const now = new Date();

  // 두 날짜 간의 간격을
  const duration = intervalToDuration({ start: date, end: now });
  // 1시간 미만:
  if (duration.hours === 0 && duration.minutes !== undefined) {
    if (duration.minutes === 0) {
      return "방금 전";
    }
    return `${duration.minutes}분 전`;
  }
  // 1시간 이상
  if (duration.hours !== undefined && duration.hours > 0) {
    return `${duration.hours}시간 전`;
  }
  // 범위 밖의 값 처리
  return format(date, "yyyy.MM.dd");
};
