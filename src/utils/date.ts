import { format } from "date-fns";

/**
 * 현재 날짜를 'yyyyMMdd' 형식의 문자열로 반환하는 함수
 */
export const getCurrentDate = () => {
  return format(new Date(), "yyyyMMdd");
};
