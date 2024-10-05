import { useQuery, useSuspenseQuery, type UseSuspenseQueryResult } from "@tanstack/react-query";
import { handleGetDogInfoAgenda, handleGetDogInfoRecord } from "apis/member/dogs";
import { getDateFromArray } from "utils/date";

/** 알림장 조회 */
export const useDogInfoAgenda = (dogId: number, date?: string) => {
  return useQuery({
    queryKey: ["dogAgenda", dogId, date],
    queryFn: () => handleGetDogInfoAgenda(dogId, date),
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false,
    throwOnError: false
  });
};

export type DogInfoRecordType = {
  date: Date[];
  registeredDate: Date;
};
/** 등원 기록 조회 */
export const useDogInfoRecord = (
  dogId: number,
  date?: string
): UseSuspenseQueryResult<DogInfoRecordType> => {
  return useSuspenseQuery({
    queryKey: ["dogRecord", dogId, date],
    queryFn: () => handleGetDogInfoRecord(dogId, date),
    select: (data) => {
      return {
        date: data.date.map((day) => getDateFromArray(day)),
        registeredDate: getDateFromArray(data.registeredDate)
      };
    },
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
};
