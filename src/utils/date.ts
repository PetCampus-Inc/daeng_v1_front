import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  formatDistanceToNow,
  intervalToDuration,
  isAfter,
  isBefore,
  parseISO
} from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 날짜 배열을 Date 객체로 변환합니다.
 * @param {number[]} dateArray - [년, 월, 일] 또는 [년, 월, 일, 시, 분, 초, 밀리초] 형식의 배열
 * @returns {Date} 변환된 Date 객체
 */
export function convertArrayToDate(dateArray: number[]): Date {
  const [year, month, day, hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = dateArray;
  return new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
}

/**
 * 현재 날짜를 'yyyyMMdd' 형식의 문자열로 반환합니다.
 * @returns {string} 'yyyyMMdd' 형식의 현재 날짜
 */
export const getCurrentDateString = (): string => {
  return format(new Date(), "yyyyMMdd");
};

/**
 * 숫자 또는 숫자 배열의 각 요소를 2자리 문자열로 변환합니다.
 * @param {number | number[]} input - 변환할 숫자 또는 숫자 배열
 * @returns {string | string[]} 변환된 문자열 또는 문자열 배열
 */
export const padToTwoDigits = (input: number | number[]): string | string[] => {
  if (Array.isArray(input)) {
    return input.map((n) => n.toString().padStart(2, "0"));
  }
  return input.toString().padStart(2, "0");
};

/**
 * 숫자 배열을 ISO 8601 문자열로 변환합니다.
 * @param {number[]} timeArray - [년, 월, 일, 시, 분, 초, 밀리초] 형식의 배열
 * @returns {string} ISO 8601 형식의 날짜 문자열
 */
export const getISOString = (timeArray: number[]): string => {
  const [year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0] = timeArray;
  const date = new Date(year, month - 1, day, hour, minute, second, millisecond / 1000000);
  return date.toISOString();
};

/**
 * 주어진 날짜로부터 현재까지의 경과 시간을 문자열로 반환합니다.
 * @param {string | string[]} dateInput - 날짜 문자열 또는 [년, 월, 일] 형식의 배열
 * @returns {string} "오늘", "1일 전", "2일 전" 등의 형식으로 반환
 */
export const getDaysAgo = (dateInput: string | string[]): string => {
  const formattedDate = Array.isArray(dateInput)
    ? dateInput.map((part) => part.padStart(2, "0")).join("-")
    : dateInput
        .split("-")
        .map((part) => part.padStart(2, "0"))
        .join("-");

  const date = parseISO(formattedDate);
  const now = new Date();

  now.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === now.getTime()) {
    return "오늘";
  }

  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
};

/**
 * 주어진 시간으로부터 현재까지의 경과 시간을 상세하게 문자열로 반환합니다.
 * @param {string | number[]} timeInput - ISO 문자열 또는 [년, 월, 일, 시, 분, 초, 밀리초] 형식의 배열
 * @returns {string} "방금 전", "n분 전", "n시간 전", "n일 전" 등의 형식으로 반환
 */
export const getTimeAgo = (timeInput: string | number[]): string => {
  const date = Array.isArray(timeInput)
    ? new Date(
        timeInput[0],
        timeInput[1] - 1,
        timeInput[2],
        timeInput[3] || 0,
        timeInput[4] || 0,
        timeInput[5] || 0,
        Math.floor((timeInput[6] || 0) / 1000000)
      )
    : parseISO(timeInput);

  const now = new Date();
  const minutesDiff = differenceInMinutes(now, date);
  const hoursDiff = differenceInHours(now, date);
  const daysDiff = differenceInDays(now, date);

  if (minutesDiff < 1) return "방금 전";
  if (minutesDiff < 60) return `${minutesDiff}분 전`;
  if (hoursDiff < 24) return `${hoursDiff}시간 전`;
  if (daysDiff === 1) return "1일 전";
  return `${daysDiff}일 전`;
};

/**
 * 시간 배열을 간단한 상대 시간 문자열로 변환합니다.
 * @param {number[]} timestampArray - [년, 월, 일, 시, 분, 초, 밀리초] 형식의 배열
 * @returns {string} "방금 전", "n분 전", "n시간 전" 또는 "yyyy.MM.dd" 형식의 문자열
 */
export const getSimpleRelativeTimeString = (timestampArray: number[]): string => {
  const date = convertArrayToDate(timestampArray);
  const now = new Date();
  const duration = intervalToDuration({ start: date, end: now });

  if (duration.hours === 0 && duration.minutes !== undefined) {
    if (duration.minutes === 0) return "방금 전";
    return `${duration.minutes}분 전`;
  }
  if (duration.hours !== undefined && duration.hours > 0) {
    return `${duration.hours}시간 전`;
  }
  return format(date, "yyyy.MM.dd");
};

/**
 * 주어진 날짜가 유효 범위 내에 있는지 확인하고,
 * 범위를 벗어나면 가장 가까운 유효한 날짜를 반환합니다.
 *
 * @param date 확인할 날짜
 * @param minDate 선택 가능한 최소 날짜
 * @param maxDate 선택 가능한 최대 날짜
 * @returns 유효 범위 내의 가장 가까운 날짜
 */
export const getClosestValidDate = ({
  date,
  minDate,
  maxDate
}: {
  date: Date;
  minDate: Date;
  maxDate: Date;
}): Date => {
  if (isBefore(date, minDate)) return minDate;
  if (isAfter(date, maxDate)) return maxDate;
  return date;
};
