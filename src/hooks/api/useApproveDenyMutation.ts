import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handlePostApproveForm,
  handlePostApproveTeacher,
  handlePostDenyForm,
  handlePostDenyTeacher
} from "apis/admin.api";
import showToast from "utils/showToast";

export const useApproveFormMutation = () => {
  return useMutation({
    mutationFn: (enrollmentFormId: number) => handlePostApproveForm(enrollmentFormId),
    throwOnError: true
  }).mutate;
};

export const useDenyFormMutation = () => {
  return useMutation({
    mutationFn: (enrollmentFormId: number) => handlePostDenyForm(enrollmentFormId),
    throwOnError: true
  }).mutate;
};

export const useApproveTeacherMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (adminId: number) => handlePostApproveTeacher(adminId),
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
    mutationFn: (adminId: number) => handlePostDenyTeacher(adminId),
    onError: () => {
      showToast("거절에 실패했습니다. 다시 시도해주세요.", "bottom");
    },
    throwOnError: true
  }).mutate;
};
