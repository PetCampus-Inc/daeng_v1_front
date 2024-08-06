import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleGetNewTicket,
  handleGetTicketDetail,
  handlePostNewTicket
} from "apis/admin/attendance.api";
import { Adapter, NewTicketFormAdapter, TicketDetailFormAdapter } from "libs/adapters";
import { NewTicketData, TicketDetailData } from "types/admin/attendance.type";
import showToast from "utils/showToast";

// 강아지 상세 - 이용권 정보 조회
export const useGetTicketDetail = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.ATTENDANCE_DOG_TICKET(dogId),
    queryFn: () => handleGetTicketDetail(dogId),
    staleTime: 1000 * 60 * 60
  });
};

// 강아지 상세 = 이용권 캐싱된 정보 조회
export const useGetCachedTicketDetail = (dogId: number) => {
  const queryClient = useQueryClient();

  return useSuspenseQuery({
    queryKey: QUERY_KEY.ATTENDANCE_DOG_TICKET(dogId),
    queryFn: () => handleGetTicketDetail(dogId),
    initialData: () => queryClient.getQueryData(QUERY_KEY.ATTENDANCE_DOG_TICKET(dogId)),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(QUERY_KEY.ATTENDANCE_DOG_TICKET(dogId))?.dataUpdatedAt,
    select: (data) =>
      Adapter.from(data).to((item: TicketDetailData) => new TicketDetailFormAdapter(item).adapt())
  });
};

// 강아지 상세 - 이용권 갱신 조회
export const useGetNewTicket = (schoolId: number) => {
  return useSuspenseQuery({
    queryKey: ["dogTicketInfo", schoolId],
    queryFn: () => handleGetNewTicket(schoolId),
    select: (data) =>
      Adapter.from(data).to((item: NewTicketData) => new NewTicketFormAdapter(item).adapt())
  });
};

// 강아지 상세  - 이용권 갱신 요청
export const useCreateNewTicket = (dogId: number) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: handlePostNewTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ATTENDANCE_DOG_TICKET(dogId) });
    },
    onError: () => {
      showToast("갱신을 실패했습니다. 다시 시도해주세요.", "bottom");
    }
  });
  return { mutateNewTicket: mutate };
};
