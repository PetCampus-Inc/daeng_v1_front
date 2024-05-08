import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleGetMemberInfo,
  handleGetMemberProfileInfo,
  handleMemberInfoResult
} from "apis/member/member.api";
import { IMemberProfilePostInfo } from "types/member/home.types";

// 견주 정보
export const useGetMemberInfo = (memberId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_INFO(memberId),
    queryFn: () => handleGetMemberInfo(memberId)
  });
};

// 견주 상세 정보
export const useGetMemberProfileInfo = (memberId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_PROFILE_INFO(memberId),
    queryFn: () => handleGetMemberProfileInfo(memberId)
  });
};

// 견주 상세 정보 수정
export const usePostMemberProfileInfo = () => {
  const queryClient = useQueryClient();
  const memberProfileInfoMutation = useMutation({
    mutationFn: (req: IMemberProfilePostInfo) => handleMemberInfoResult(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_PROFILE_POST_INFO });
    }
  });
  return { mutateAttend: memberProfileInfoMutation.mutate };
};
