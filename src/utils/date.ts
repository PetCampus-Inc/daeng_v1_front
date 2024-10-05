import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  intervalToDuration,
  isAfter,
  isBefore,
  isSameDay,
  parse
} from "date-fns";

import type { LocalDate } from "types/helper.types";

/**
 * 날짜 배열을 Date 객체로 변환합니다.
 * @param {LocalDate} dateArray - [년, 월, 일] 또는 [년, 월, 일, 시, 분, 초, 밀리초] 형식의 배열
 * @returns {Date} 변환된 Date 객체
 */
export function getDateFromArray(dateArray: LocalDate): Date {
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
 * 1자리 숫자를 2자리 문자열로 변환합니다.
 * @param {number} input - 변환할 숫자
 * @returns {string} 2자리 문자열
 */
export function getPadString(input: number): string;

/**
 * 날짜를 [yy, mm, dd] 형식으로 변환합니다.
 * @param {LocalDate} input - 변환할 날짜
 * @returns {string[]} [yy, mm, dd]
 */
export function getPadString(input: number[]): string[];

export function getPadString(input: number | number[]): string | string[] {
  if (Array.isArray(input)) {
    return input.map((n) => n.toString().padStart(2, "0"));
  }
  return input.toString().padStart(2, "0");
}

/**
 * Date 객체를 ISO 8601(YYYY-MM-DD) 형식의 문자열로 변환합니다.
 * @param {Date} date - 변환할 Date 객체
 * @returns {string} ISO 8601(YYYY-MM-DD) 형식의 문자열
 */
export const getISODateString = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

/**
 * 주어진 날짜로부터 현재까지의 경과 시간을 문자열로 반환합니다.
 * @param {number[]} dateInput - [년, 월, 일] 형식의 배열
 * @returns {string} "오늘", "1일 전", "2일 전" 등의 형식으로 반환
 */
export const getDaysAgo = (dateInput: number[]): string => {
  const [year, month, day] = dateInput;
  const date = new Date(year, month - 1, day);
  const now = new Date();

  now.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === now.getTime()) {
    return "오늘";
  }

  const daysDiff = differenceInDays(now, date);
  return `${daysDiff}일 전`;
};

/**
 * 주어진 시간으로부터 현재까지의 경과 시간을 상세하게 문자열로 반환합니다.
 * @param {number[]} timeInput - [년, 월, 일, 시, 분, 초, 나노초] 형식의 배열
 * @returns {string} "방금 전", "n분 전", "n시간 전", "n일 전" 등의 형식으로 반환
 */
export const getTimeAgo = (timeInput: number[]): string => {
  const [year, month, day, hour = 0, minute = 0, second = 0, nanosecond = 0] = timeInput;
  const date = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    second,
    Math.floor(nanosecond / 1000000)
  );
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
 * 상대 시간 문자열로 변환합니다.
 * @param {number[]} timestampArray - [년, 월, 일, 시, 분, 초, 나노초] 형식의 배열
 * @returns {string} "방금 전", "n분 전", "n시간 전" 또는 "yyyy.MM.dd" 형식의 문자열
 */
export const getRelativeTime = (timestampArray: number[]): string => {
  const [year, month, day, hour = 0, minute = 0, second = 0, nanosecond = 0] = timestampArray;
  const date = new Date(
    year,
    month - 1,
    day,
    hour,
    minute,
    second,
    Math.floor(nanosecond / 1000000)
  );
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
 * 사진 전송 시간을 정책에 맞게 포맷팅합니다.
 * @param {number[]} photoTimestamp - 사진 전송 시간 ([년, 월, 일, 시, 분, 초, 나노초] 형식의 배열)
 * @param {string} selectedDate - 선택된 날짜 ('YYYY-MM-DD' 형식의 문자열)
 * @returns {string} 포맷된 시간 문자열
 * @see https://www.notion.so/ff285328ca3e4d8381aac68473bb8cf4?pvs=4 정책 상세 내용
 */
export const getFormattedPhotoTime = (photoTimestamp: number[], selectedDate: string): string => {
  const [pYear, pMonth, pDay, pHour = 0, pMinute = 0, pSecond = 0, pNanosecond = 0] =
    photoTimestamp;

  const photoDate = new Date(
    pYear,
    pMonth - 1,
    pDay,
    pHour,
    pMinute,
    pSecond,
    Math.floor(pNanosecond / 1000000)
  );
  const selected = parse(selectedDate, "yyyy-MM-dd", new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isSameDay(selected, today)) {
    const now = new Date();
    const minutesDiff = differenceInMinutes(now, photoDate);
    const hoursDiff = differenceInHours(now, photoDate);

    if (hoursDiff < 1) {
      return `${minutesDiff}분 전`;
    } else {
      return `${hoursDiff}시간 전`;
    }
  } else {
    return format(photoDate, "HH:mm");
  }
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
