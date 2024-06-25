import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postApproveForm,
  postApproveTeacher,
  postDenyForm,
  postDenyTeacher
} from "apis/admin/school.api";
import showToast from "utils/showToast";

export const useApproveFormMutation = () => {
  return useMutation({
    mutationFn: (enrollmentFormId: number) => postApproveForm(enrollmentFormId),
    throwOnError: true
  }).mutate;
};

export const useDenyFormMutation = () => {
  return useMutation({
    mutationFn: (enrollmentFormId: number) => postDenyForm(enrollmentFormId),
    throwOnError: true
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
