import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetMemberNewAlarm } from "apis/member/member.api";

export const useGetMemberNewAlarm = (dogId: number | null) => {
  return useSuspenseQuery({
    queryKey: ["getMemberNewAlarm", dogId],
    queryFn: () => handleGetMemberNewAlarm(dogId)
  });
};
