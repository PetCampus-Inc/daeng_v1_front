import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAttendCareDogs, handleGetAttendDogs } from "apis/attendance";

export const useGetAttendDogList = (schoolId: number) => {
  return useSuspenseQuery({
    queryKey: ["getAttendDogList", schoolId],
    queryFn: () => handleGetAttendDogs(schoolId)
  });
};

export const useAttendCareDogs = (schoolId: number) => {
  return useSuspenseQuery({
    queryKey: ["getAttendCareDogs", schoolId],
    queryFn: () => handleGetAttendCareDogs(schoolId)
  });
};
