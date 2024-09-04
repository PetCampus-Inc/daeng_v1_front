import { useSuspenseQuery, type UseSuspenseQueryResult } from "@tanstack/react-query";
import { handleGetDogInfoAgenda, handleGetDogInfoRecord } from "apis/member/dogs";
import { format } from "date-fns/format";
import { AgendaStatus } from "types/common/status.types";
import { convertArrayToDate } from "utils/date";

export const useDogInfoAgenda = (dogId: number, date?: string) => {
  return useSuspenseQuery({
    queryKey: ["dogAgenda", dogId, date],
    queryFn: () => handleGetDogInfoAgenda(dogId, date),
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false
  });
};

export type DogInfoRecordType = {
  date: string;
  status: AgendaStatus;
  registeredDate: string;
};
export const useDogInfoRecord = (
  dogId: number,
  date?: string
): UseSuspenseQueryResult<DogInfoRecordType[]> => {
  return useSuspenseQuery({
    queryKey: ["dogRecord", dogId, date],
    queryFn: () => handleGetDogInfoRecord(dogId, date),
    select: (data) =>
      data.map((item) => {
        return {
          date: format(convertArrayToDate(item.date), "yyyy-MM-dd"),
          status: item.status,
          registeredDate: format(convertArrayToDate(item.registeredDate), "yyyy-MM-dd")
        };
      }),
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
};
