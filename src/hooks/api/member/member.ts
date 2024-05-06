import { QUERY_KEY } from "constants/queryKey";

import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetMemberInfo, handleGetMemberMainDogInfo } from "apis/member/member.api";

export const useGetMemberInfo = (memberId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_INFO(memberId),
    queryFn: () => handleGetMemberInfo(memberId)
  });
};

export const useGetMemberMainDogInfo = (memberId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_MAIN_DOG_INFO(memberId),
    queryFn: () => handleGetMemberMainDogInfo(memberId)
  });
};
