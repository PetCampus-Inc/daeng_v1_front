import { routes } from "constants/path";
import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  IEnrollmentProps,
  MemberDogEnrollmentProps,
  handleDeleteMemberEnrollment,
  handleGetBreed,
  handleGetEnrollment,
  handleGetMemberDogEnrollment,
  handlePostEnrollment
} from "apis/member/enrollment.api";
import { Adapter } from "libs/adapters";
import { EnrollmentFormAdapter } from "libs/adapters/ServerToFormAdapter";
import { useNavigate } from "react-router-dom";

import type {
  EnrollmentInfoType,
  EnrollmentDataType,
  EnrollmentFormDataType
} from "types/member/enrollment.types";

// 가입신청서 조회
export const useGetEnrollment = ({ schoolId }: IEnrollmentProps) => {
  return useSuspenseQuery<EnrollmentDataType, Error, EnrollmentFormDataType>({
    queryKey: QUERY_KEY.ENROLLMENT(schoolId),
    queryFn: () => handleGetEnrollment({ schoolId }),
    refetchOnWindowFocus: false,
    select: (data) => {
      const fromData = Adapter.from(data).to<EnrollmentDataType, EnrollmentFormDataType>((item) => {
        const adapterInstance = new EnrollmentFormAdapter(item);
        return adapterInstance.adapt();
      });

      return { ...fromData, pickDropState: data.pickDropState };
    }
  });
};

// 강아지 유치원 재등록 가입신청서 조회
export const useGetMemberDogEnrollment = ({ dogId, schoolId }: MemberDogEnrollmentProps) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.DOG_ENROLLMENT(dogId, schoolId),
    queryFn: () => handleGetMemberDogEnrollment({ dogId, schoolId })
  });
};

// 견주 가입신청서 등록
export const usePostEnrollment = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (enrollmentData: EnrollmentInfoType) => handlePostEnrollment(enrollmentData),
    onSuccess: () => navigate(routes.approval.root)
  });

  return { mutateEnrollment: mutate };
};

// 견주 마이페이지 가입신청서 등록 - 재등록, 재가입
export const usePostMemberEnrollment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (enrollmentData: EnrollmentInfoType) => handlePostEnrollment(enrollmentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_MYPAGE_MAIN_INFO });
      navigate(routes.member.mypage.root);
    }
  });

  return { mutateMemberEnrollment: mutate };
};

// 견종 검색
export const useGetBreed = (inputValue: string) => {
  return useQuery({
    queryKey: QUERY_KEY.BREED(inputValue),
    queryFn: () => handleGetBreed(inputValue),
    placeholderData: (previousData) => previousData,
    enabled: !!inputValue, // 입력값이 있을 때만 실행,
    staleTime: 60 * 1000, // 1분동안 캐시된 데이터 사용
    gcTime: 5 * 60 * 1000 // 비활성 캐시는 5분동안 유지
  });
};

// 견주 마이페이지 가입신청서 삭제
export const useDeleteMemebrEnrollment = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (enrollmentFormId: number) => handleDeleteMemberEnrollment(enrollmentFormId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_MYPAGE_MAIN_INFO });
    }
  });

  return { mutateDeleteMemebrEnrollment: mutate };
};
