import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAttendDogs } from "apis/attendance";
import type { IAttendDogsInfo } from "types/Attendance.type";

export const useGetAttendDogList = (schoolId: number) => {
  return useSuspenseQuery<IAttendDogsInfo>({
    queryKey: ["getAttendDogList", schoolId],
    queryFn: () => handleGetAttendDogs(schoolId)
  });
};
