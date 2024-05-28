import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  IEnrollmentProps,
  handleGetBreed,
  handleGetEnrollment,
  handlePostEnrollment
} from "apis/member/enrollment.api";
import { Adapter } from "libs/Adapter";
import { ReadModeAdapter } from "libs/Adapter/ServerToFormAdapter";

import type { IResponseAdminForm } from "types/admin/enrollment.types";
import type {
  EnrollmentInfo,
  EnrollmentData,
  PickDropStateType
} from "types/member/enrollment.types";

export type ReturnType = Omit<
  EnrollmentData,
  | "requiredItemList"
  | "pickDropState"
  | "roundTicketNumber"
  | "monthlyTicketNumber"
  | "schoolFormName"
  | "member"
> & {
  requiredItemList: Map<number, boolean>;
  pickDropState: PickDropStateType;
  roundTicketNumber: number[];
  monthlyTicketNumber: number[];
};

// 견주 가입신청서 조회
export const useGetEnrollment = ({ memberId, schoolId }: IEnrollmentProps) => {
  return useSuspenseQuery<EnrollmentData, Error, ReturnType>({
    queryKey: QUERY_KEY.ENROLLMENT(schoolId, memberId),
    queryFn: () => handleGetEnrollment({ schoolId, memberId }),
    refetchOnWindowFocus: false,
    select: (data): ReturnType => {
      const { schoolFormName, ...rest } = data;
      const formdata = Adapter.from(rest).to<IResponseAdminForm, ReturnType>((item) => {
        const adapterInstance = new ReadModeAdapter(item);
        return adapterInstance.adapt();
      });

      return { ...formdata, pickDropState: rest.pickDropState };
    }
  });
};

// 견주 가입신청서 등록
export const usePostEnrollment = () => {
  const enrollMutation = useMutation({
    mutationFn: (enrollmentData: EnrollmentInfo) => handlePostEnrollment(enrollmentData),
    throwOnError: true
  });

  return enrollMutation.mutate;
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
