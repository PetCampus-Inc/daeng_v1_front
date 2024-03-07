import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleCallMember } from "apis/attendance";

import type { IMemberCallInfo } from "types/Attendance.type";

export const useCallMember = (dogId: number) => {
  return useQuery<IMemberCallInfo>({
    queryKey: QUERY_KEY.MEMBER_PHONE_NUMBER(dogId),
    queryFn: () => handleCallMember(dogId),
    enabled: false
  });
};
