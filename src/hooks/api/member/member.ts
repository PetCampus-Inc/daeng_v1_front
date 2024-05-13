import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { handleGetSchoolInfo } from "apis/member/enrollment.api";
import {
  handleGetMemberInfo,
  handleGetMemberProfileInfo,
  handleMemberInfoResult,
  handlePostMemberDogDelete,
  handlePostMemberDogEnrollment
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

// 견주 가입신청서 취소
export const usePostMemberDogEnrollment = (memberId: string) => {
  const queryClient = useQueryClient();
  const enrollMemberDOgMutation = useMutation({
    mutationFn: (enrollmentFormId: string) => handlePostMemberDogEnrollment(enrollmentFormId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_INFO(memberId) });
      console.log("성공");
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return enrollMemberDOgMutation.mutate;
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

// 강아지 삭제
export const usePostMemberDogDelete = (memberId: string) => {
  const queryClient = useQueryClient();
  const memberDogDeletMutation = useMutation({
    mutationFn: (dogId: string) => handlePostMemberDogDelete(memberId, dogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_INFO(memberId) });
    }
  });

  return memberDogDeletMutation.mutate;
};
