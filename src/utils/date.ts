import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  formatDistanceToNow,
  intervalToDuration,
  parseISO
} from "date-fns";
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
 * number[] 시간을 ISO 8601 문자열로 변환하는 함수
 */
export const getISOString = (timeArray: number[]): string => {
  const [year, month, day, hour, minute, second, millisecond] = timeArray;
  const date = new Date(year, month - 1, day, hour, minute, second, millisecond / 1000000);
  return date.toISOString();
};

/**
 * @description 현재 시간부터 주어진 날짜까지의 거리를 표시하는 함수
 * @param {string | string[]} str 날짜 문자열 또는 연, 월, 일이 담긴 배열
 * @returns {string} "오늘", "1일 전", "2일 전" 등
 */
export const getDaysAgo = (str: string | string[]): string => {
  // 날짜 형식을 올바르게 처리
  const dateInput = typeof str === "string" ? str : str.join("-");
  const dateParts = dateInput.split("-").map((part) => part.padStart(2, "0"));
  const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

  const date = parseISO(formattedDate);
  const now = new Date();

  // 현재 날짜와 비교하여 오늘인 경우 처리
  now.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === now.getTime()) {
    return "오늘";
  }

  // 주어진 날짜로부터 지금까지의 거리 반환
  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
};

/**
 * @description 현재 시간부터 주어진 시간까지의 거리를 표시하는 함수
 * @param {string | number[]} str
 * @returns {string} "방금 전", "n분 전", "n시간 전", "n일 전" 등
 */
export const getTimeAgo = (str: string | number[]) => {
  let date: Date;

  // 배열이면 Date 객체로 변환
  if (Array.isArray(str)) {
    const [year, month, day, hour, minute, second, millisecond] = str;
    date = new Date(year, month - 1, day, hour, minute, second, Math.floor(millisecond / 1000000));
  } else {
    // 문자열이면 parseISO 사용
    date = parseISO(str);
  }

  const now = new Date();
  const minutesDifference = differenceInMinutes(now, date);
  const hoursDifference = differenceInHours(now, date);
  const daysDifference = differenceInDays(now, date);

  if (minutesDifference < 1) {
    return "방금 전";
  } else if (minutesDifference < 60) {
    return `${minutesDifference}분 전`;
  } else if (hoursDifference < 24) {
    return `${hoursDifference}시간 전`;
  } else if (daysDifference === 1) {
    return "1일 전";
  } else {
    return `${daysDifference}일 전`;
  }
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
