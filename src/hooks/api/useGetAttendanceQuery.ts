import { QUERY_KEY } from "constants/queryKey";

import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAttendDogs } from "apis/attendance";

import type { IAttendDogsInfo } from "types/Attendance.type";

export const useGetAttendDogList = (schoolId: number) => {
  return useSuspenseQuery<IAttendDogsInfo>({
    queryKey: QUERY_KEY.ATTEND_LIST_ID(schoolId),
    queryFn: () => handleGetAttendDogs(schoolId)
  });
};
