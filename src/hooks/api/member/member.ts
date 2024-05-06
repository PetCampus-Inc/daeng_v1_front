import { QUERY_KEY } from "constants/queryKey";

import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetMemberInfo } from "apis/member/member.api";
import { handleGetSchoolInfo } from "apis/member/school.api";

export const useGetMemberInfo = (memberId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_INFO(memberId),
    queryFn: () => handleGetMemberInfo(memberId)
  });
};

export const useGetMemberSchoolInfo = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_SCHOOL_INFO(dogId),
    queryFn: () => handleGetSchoolInfo(dogId)
  });
};
