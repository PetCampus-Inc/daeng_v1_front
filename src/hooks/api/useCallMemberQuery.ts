import { useQuery } from "@tanstack/react-query";
import { handleCallMember } from "apis/attendance";
import type { IMemberCallInfo } from "types/Attendance.type";

export const useCallMember = (dogId: number) => {
  return useQuery<IMemberCallInfo>({
    queryKey: ["getPhoneNumber", dogId],
    queryFn: () => handleCallMember(dogId),
    enabled: false
  });
};
