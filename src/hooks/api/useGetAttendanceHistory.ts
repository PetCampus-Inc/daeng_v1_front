import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAttendanceHistory } from "apis/attendance";

const useGetAttendanceHistory = (dogId: number, calendar?: string) => {
  const query = useSuspenseQuery({
    queryKey: ["getAttendanceHistory", dogId, calendar],
    queryFn: () => handleGetAttendanceHistory(dogId, calendar),
    staleTime: 1000 * 60 * 60
  });
  return query.data;
};

export default useGetAttendanceHistory;
