import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetDogInfoRecord } from "apis/admin/attendance.api";

const useGetDogInfoRecord = (dogId: number, date?: string) => {
  const query = useSuspenseQuery({
    queryKey: ["handleGetDogInfoRecord", dogId, date],
    queryFn: () => handleGetDogInfoRecord(dogId, date),
    staleTime: 1000 * 60 * 60
  });
  return query.data;
};

export default useGetDogInfoRecord;
