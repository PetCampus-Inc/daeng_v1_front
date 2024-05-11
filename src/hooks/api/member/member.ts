import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
  handleGetMemberInfo,
  handleGetMemberProfileInfo,
  handlePostMemberDogEnrollment
} from "apis/member/member.api";

export const useGetMemberInfo = (memberId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_INFO(memberId),
    queryFn: () => handleGetMemberInfo(memberId)
  });
};

export const useGetMemberProfileInfo = (memberId: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_PROFILE_INFO(memberId),
    queryFn: () => handleGetMemberProfileInfo(memberId)
  });
};

// 견주 가입신청서 취소
export const usePostMemberDogEnrollment = () => {
  const enrollMemberDOgMutation = useMutation({
    mutationFn: (enrollmentFormId: string) => handlePostMemberDogEnrollment(enrollmentFormId),
    throwOnError: true
  });

  return enrollMemberDOgMutation.mutate;
};
