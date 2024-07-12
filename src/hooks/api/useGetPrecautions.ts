import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetPrecautions } from "apis/admin/attendance.api";

const useGetPrecautions = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: ["getPrecautions"],
    queryFn: () => handleGetPrecautions(dogId),
    staleTime: 1000 * 60 * 60
  });
};

export default useGetPrecautions;
