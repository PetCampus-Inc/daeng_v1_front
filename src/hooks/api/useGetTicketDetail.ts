import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetTicketDetail } from "apis/admin/attendance.api";

const useGetTicketDetail = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: ["getTicketDetail", dogId],
    queryFn: () => handleGetTicketDetail(dogId),
    staleTime: 1000 * 60 * 60
  });
};

export default useGetTicketDetail;
