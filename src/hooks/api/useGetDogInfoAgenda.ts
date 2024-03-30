import { useQuery } from "@tanstack/react-query";
import { handleGetDogInfoAgenda } from "apis/admin.attendance.api";

const useGetDogInfoAgenda = (dogId: number, date?: string) => {
  const query = useQuery({
    queryKey: ["handleGetDogInfoRecord", dogId, date],
    queryFn: () => handleGetDogInfoAgenda(dogId, date),
    staleTime: 1000 * 60 * 60
  });
  return query.data;
};

export default useGetDogInfoAgenda;
