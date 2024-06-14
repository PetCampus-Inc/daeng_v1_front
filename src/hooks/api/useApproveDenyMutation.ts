import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postApproveForm,
  postApproveTeacher,
  postDenyForm,
  postDenyTeacher
} from "apis/admin/school.api";
import showToast from "utils/showToast";

import useMemberRejected from "./member/useMemberRejected";

export const useApproveFormMutation = () => {
  return useMutation({
    mutationFn: (enrollmentFormId: number) => postApproveForm(enrollmentFormId),
    throwOnError: true
  }).mutate;
};

export const useDenyFormMutation = () => {
  const { setIsRejected } = useMemberRejected();
  return useMutation({
    mutationFn: (enrollmentFormId: number) => postDenyForm(enrollmentFormId),
    throwOnError: true,
    onSuccess: () => {
      // 관리자 -> 견주 강아지 추가 승인 거절 상태 감지
      setIsRejected(true);
    }
  }).mutate;
};

export const useApproveTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adminId: number) => postApproveTeacher(adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.TEACHER_LIST });
    },
    onError: () => {
      showToast("승인에 실패했습니다. 다시 시도해주세요.", "bottom");
    },
    throwOnError: true
  }).mutate;
};

export const useDenyTeacherMutation = () => {
  return useMutation({
    mutationFn: (adminId: number) => postDenyTeacher(adminId),
    onError: () => {
      showToast("거절에 실패했습니다. 다시 시도해주세요.", "bottom");
    },
    throwOnError: true
  }).mutate;
};
