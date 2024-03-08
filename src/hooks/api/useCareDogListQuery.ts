import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAttendCareDogs } from "apis/attendance";

import type { IAttendCareDog } from "types/Attendance.type";

const useCareDogList = (schoolId: number) => {
  return useSuspenseQuery<IAttendCareDog[]>({
    queryKey: ["careDogList"],
    queryFn: () => handleGetAttendCareDogs(schoolId)
  });
};

export default useCareDogList;
