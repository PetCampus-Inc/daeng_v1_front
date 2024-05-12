import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleGetMemberInfo,
  handleGetMemberProfileInfo,
  handleMemberInfoResult
} from "apis/member/member.api";
import { handleGetSchoolInfo } from "apis/member/school.api";
import { IMemberProfilePostInfo } from "types/member/home.types";

// 견주 정보
export const useGetMemberInfo = (memberId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_INFO(memberId),
    queryFn: () => handleGetMemberInfo(memberId)
  });
};

// 견주 상세 정보
export const useGetMemberSchoolInfo = (dogId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_SCHOOL_INFO(dogId),
    queryFn: () => handleGetSchoolInfo(dogId)
  });
};

export const useGetMemberProfileInfo = (memberId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_PROFILE_INFO(memberId),
    queryFn: () => handleGetMemberProfileInfo(memberId)
  });
};

// 견주 상세 정보 수정
export const usePostMemberProfileInfo = (memberId: string) => {
  const queryClient = useQueryClient();
  const memberProfileInfoMutation = useMutation({
    mutationFn: (req: IMemberProfilePostInfo) => handleMemberInfoResult(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_PROFILE_INFO(memberId) });
    }
  });

  return { mutateAttend: memberProfileInfoMutation.mutate };
};
