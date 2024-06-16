import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  IEnrollmentProps,
  handleGetBreed,
  handleGetEnrollment,
  handlePostEnrollment
} from "apis/member/enrollment.api";
import { useLocalStorageValue, useSetLocalStorage } from "hooks/common/useLocalStorage";
import { Adapter } from "libs/adapters";
import { EnrollmentFormAdapter } from "libs/adapters/ServerToFormAdapter";
import { useState } from "react";

import type {
  EnrollmentInfoType,
  EnrollmentDataType,
  EnrollmentFormDataType
} from "types/member/enrollment.types";

// 가입신청서 조회
export const useGetEnrollment = ({ memberId, schoolId }: IEnrollmentProps) => {
  return useSuspenseQuery<EnrollmentDataType, Error, EnrollmentFormDataType>({
    queryKey: QUERY_KEY.ENROLLMENT(schoolId, memberId),
    queryFn: () => handleGetEnrollment({ schoolId, memberId }),
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

// 견주 가입신청서 등록
export const usePostEnrollment = () => {
  const setEnrollmentFormId = useSetLocalStorage();
  const storageEnrollmentId = useLocalStorageValue<string>("ENROLLMENT_FORM_ID") || "[]";
  const { mutate } = useMutation({
    mutationFn: (enrollmentData: EnrollmentInfoType) => handlePostEnrollment(enrollmentData),
    onSuccess: (enrollmentFormId) => {
      // 데이터 배열 형식으로 저장
      if (!JSON.parse(storageEnrollmentId).includes(enrollmentFormId)) {
        const updateEnrollmentIds = [...storageEnrollmentId, enrollmentFormId];
        setEnrollmentFormId({ key: "ENROLLMENT_FORM_ID", value: updateEnrollmentIds });
      }
    }
  });

  return { mutateEnrollment: mutate };
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
