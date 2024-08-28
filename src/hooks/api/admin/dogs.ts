import { usePrefetchQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleGetDogDetail,
  handleGetDogInfoRecord,
  handleGetPrecautions
} from "apis/admin/attendance.api";
import { format } from "date-fns/format";

const STALE_TIME = 1000 * 60 * 60;

export const useDogInfoData = (dogId: number) => {
  // 강아지 정보 prefetch
  usePrefetchQuery({
    queryKey: ["dogInfoDetail", dogId],
    queryFn: () => handleGetDogDetail(dogId)
  });

  // 유의사항 정보 prefetch
  usePrefetchQuery({
    queryKey: ["dogInfoPrecautions", dogId],
    queryFn: () => handleGetPrecautions(dogId)
  });

  // Tab에 뱃지 표시 여부
  const { data: precautionsData } = useSuspenseQuery({
    queryKey: ["dogInfoPrecautions", dogId],
    queryFn: () => handleGetPrecautions(dogId)
  });
  const showBadge = precautionsData.modifiedList.length > 0;

  return {
    showBadge
  };
};

// 강아지 상세 - 강아지 정보 조회
export const useGetDogDetail = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: ["dogInfoDetail", dogId],
    queryFn: () => handleGetDogDetail(dogId),
    staleTime: STALE_TIME,
    select: (data) => {
      const { member, ...dogInfo } = data;
      return {
        dogInfo,
        memberInfo: member
      };
    }
  });
};

// 강아지 상세 - 등원기록 조회
export const useGetDogInfoRecord = (dogId: number, date?: string) => {
  return useSuspenseQuery({
    queryKey: ["dogInfoRecord", dogId, date],
    queryFn: () => handleGetDogInfoRecord(dogId, date),
    select: (data) => data.map((item) => format(item.date.join("-"), "yyyy-MM-dd")),
    staleTime: STALE_TIME
  });
};

// 강아지 상세 - 유의사항 조회
export const useGetPrecautions = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: ["dogInfoPrecautions", dogId],
    queryFn: () => handleGetPrecautions(dogId),
    staleTime: STALE_TIME
  });
};
