import {
  useMutation,
  usePrefetchQuery,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
  useInfiniteQuery,
  type UseSuspenseQueryResult
} from "@tanstack/react-query";
import { fetchDogImage } from "apis/admin/admin.api";
import {
  handleGetDogDetail,
  handleGetDogInfoAgenda,
  handleGetDogInfoRecord,
  handleGetPrecautions,
  handlePostDogMemo
} from "apis/admin/attendance.api";
import { Adapter, DataFormatAdapter } from "libs/adapters";
import { AdminDogImageRequest } from "types/admin/admin.types";
import { getDateFromArray } from "utils/date";

import type { DogInfoDetailData } from "types/admin/attendance.type";

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
  const showBadge = !!precautionsData.modifiedList;

  return {
    showBadge
  };
};

// 강아지 상세 - 강아지 정보 조회
export type DogDetailInfo = ReturnType<DataFormatAdapter<DogInfoDetailData>["toFrontend"]>;
export const useGetDogDetail = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: ["dogInfoDetail", dogId],
    queryFn: () => handleGetDogDetail(dogId),
    staleTime: STALE_TIME,
    select: (data) => {
      const formattedData = Adapter.from(data).to<typeof data, DogDetailInfo>((item) =>
        new DataFormatAdapter(item).toFrontend()
      );
      const { member, ...dogInfo } = formattedData;

      return {
        dogInfo: dogInfo,
        memberInfo: member
      };
    }
  });
};

// 강아지 상세 - 등원기록 조회
export type DogInfoRecordType = {
  date: Date[];
  registeredDate: Date;
};
export const useGetDogInfoRecord = (
  dogId: number,
  date?: string
): UseSuspenseQueryResult<DogInfoRecordType> => {
  return useSuspenseQuery({
    queryKey: ["dogInfoRecord", dogId, date],
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

// 강아지 정보 - 알림장 조회
export const useGetDogInfoAgenda = (dogId: number, date?: string) => {
  return useQuery({
    queryKey: ["dogInfoAgenda", dogId, date],
    queryFn: () => handleGetDogInfoAgenda(dogId, date),
    retryOnMount: false,
    refetchOnWindowFocus: false,
    throwOnError: false
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

// 강아지 상세 - 메모 작성

export const usePostMemo = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handlePostDogMemo,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["dogInfoDetail", newData.dogId] });
      const previousData = queryClient.getQueryData<DogInfoDetailData>([
        "dogInfoDetail",
        newData.dogId
      ]);
      queryClient.setQueryData(
        ["dogInfoDetail", newData.dogId],
        (oldData: DogInfoDetailData | undefined) => {
          if (!oldData) return previousData;
          return {
            ...oldData,
            dogMemo: newData.memo
          };
        }
      );
      return { previousData };
    },
    onError: (err, newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["dogInfoDetail", newData.dogId], context.previousData);
      }
    },
    onSettled: (newData, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ["dogInfoDetail", variables.dogId] });
    }
  });

  return { mutateMemo: mutate };
};

export const useGetDogImage = ({ dogId, size = 20 }: AdminDogImageRequest) => {
  return useInfiniteQuery({
    queryKey: ["dogImage", dogId],
    queryFn: ({ pageParam }) => fetchDogImage({ dogId, page: pageParam, size }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { hasNext, currentPage } = lastPage;
      return hasNext ? currentPage : undefined;
    }
  });
};
