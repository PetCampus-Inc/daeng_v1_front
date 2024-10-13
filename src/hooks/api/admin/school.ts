import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  getTeacherList,
  handleGetMemberFormList,
  postApproveForm,
  postApproveTeacher,
  postDeleteTeacher,
  postDenyForm,
  postDenyTeacher
} from "apis/admin/school.api";
import showToast from "utils/showToast";

// 대기중인 견주 리스트
export const useGetMemberFormList = (schoolId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.MEMBER_ENROLLMENT_LIST,
    queryFn: () => handleGetMemberFormList(schoolId)
  });
};

// 견주 승인
export const useApproveFormMutation = () => {
  return useMutation({
    mutationFn: (enrollmentFormId: number) => postApproveForm(enrollmentFormId),
    throwOnError: true
  }).mutate;
};

// 견주 거절
export const useDenyFormMutation = () => {
  return useMutation({
    mutationFn: (enrollmentFormId: number) => postDenyForm(enrollmentFormId),
    throwOnError: true
  }).mutate;
};

// 선생님 승인
export const useApproveTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adminId: number) => postApproveTeacher(adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.TEACHER_LIST });
    },
    onError: () => {
      showToast("승인에 실패했습니다. 다시 시도해주세요.", "bottom");
    }
  }).mutate;
};

// 선생님 거절
export const useDenyTeacherMutation = () => {
  return useMutation({
    mutationFn: (adminId: number) => postDenyTeacher(adminId),
    onError: () => {
      showToast("거절에 실패했습니다. 다시 시도해주세요.", "bottom");
    }
  }).mutate;
};

// 선생님 삭제
export const useTeacherDeleteMutation = () => {
  return useMutation({
    mutationFn: (adminId: number) => postDeleteTeacher(adminId)
  }).mutate;
};

// 선생님 목록
export const useGetTeacherList = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.TEACHER_LIST,
    queryFn: () => getTeacherList()
  });
};
