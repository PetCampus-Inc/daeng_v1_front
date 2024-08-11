import { QUERY_KEY } from "constants/queryKey";

import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetDogInfoAgenda, handleGetDogInfoRecord } from "apis/member/dogs";

export const useDogInfoAgenda = (dogId: number, date?: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.AGENDA(dogId, date),
    queryFn: () => handleGetDogInfoAgenda(dogId, date),
    // 마운트시에 요청 보내지 않음
    retryOnMount: false,
    // 윈도우 포커스시에 새로고침하지 않음
    refetchOnWindowFocus: false
  });
};

export const useDogInfoRecord = (dogId: number, date?: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.AGENDA(dogId, date),
    queryFn: () => handleGetDogInfoRecord(dogId, date),
    retryOnMount: false,
    refetchOnWindowFocus: false
  });
};
