import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { handleGetDogEnrollment, handleGetSchoolInfo } from "apis/member/enrollment.api";
import {
  handleGetHomeInfo,
  handleGetMemberDogDetailInfo,
  handleGetMemberInfo,
  handleGetMemberProfileInfo,
  handleMemberInfoResult,
  handlePostMemberDogDelete,
  handlePostMemberDogDetailInfo,
  handlePostMemberDogEnrollment,
  handlePostMemoDogAlleray,
  handlePostMemoDogPickdrop
} from "apis/member/member.api";
import { useNavigate } from "react-router-dom";
import { IMemberDogPostDetailInfo, IMemberProfilePostInfo } from "types/member/home.types";
import showToast from "utils/showToast";

// 견주 홈 메인
export const useGetHomeInfo = (memberId: number, dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.HOME(memberId, dogId),
    queryFn: () => handleGetHomeInfo(memberId, dogId)
  });
};

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

// 강아지 상세 정보
export const useGetMemberDogDetailnfo = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId),
    queryFn: () => handleGetMemberDogDetailInfo(dogId)
  });
};

// 강아지 가입신청서 보기 (read only)
export const useGetMemberDogEnrollmemntInfo = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_DOG_ENROLLMENT_INFO(dogId),
    queryFn: () => handleGetDogEnrollment(dogId)
  });
};

// 강아지 상세 정보 수정
export const usePostMemberDogDetailnfo = (dogId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const memberDogDetailnfoMutation = useMutation({
    mutationFn: (data: IMemberDogPostDetailInfo) => handlePostMemberDogDetailInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId) });
      navigate(-1);
      setTimeout(() => {
        showToast("수정이 완료되었습니다.", "bottom");
      }, 100);
    },
    onError: () => {
      showToast("실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return memberDogDetailnfoMutation.mutate;
};

// 강아지의 알러지/질병 내용 수정
export const usePostMemberDogAlleray = (dogId: number) => {
  const queryClient = useQueryClient();
  const memberDogAllerayMutation = useMutation({
    mutationFn: ({ dogId, memo }: { dogId: number; memo: string }) =>
      handlePostMemoDogAlleray(dogId, memo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId) });
      showToast("수정이 완료되었습니다.", "bottom");
    },
    onError: () => {
      showToast("메모 등록을 실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return memberDogAllerayMutation.mutate;
};

// 강아지의 픽드랍 메모 수정
export const usePostMemberDogPickdrop = (dogId: number) => {
  const queryClient = useQueryClient();
  const memberDogPickdropMutation = useMutation({
    mutationFn: ({ dogId, memo }: { dogId: number; memo: string }) =>
      handlePostMemoDogPickdrop(dogId, memo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_DOG_DETAIL_INFO(dogId) });
      showToast("수정이 완료되었습니다.", "bottom");
    },
    onError: () => {
      showToast("메모 등록을 실패했습니다. 다시 시도해주세요", "bottom");
    }
  });

  return memberDogPickdropMutation.mutate;
};
