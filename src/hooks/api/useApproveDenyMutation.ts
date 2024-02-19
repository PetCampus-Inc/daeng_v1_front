import { useMutation } from "@tanstack/react-query";
import {
  handlePostApproveForm,
  handlePostApproveTeacher,
  handlePostDenyForm,
  handlePostDenyTeacher
} from "apis/admin.api";

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
  return useMutation({
    mutationFn: (adminId: number) => handlePostApproveTeacher(adminId),
    throwOnError: true
  }).mutate;
};

export const useDenyTeacherMutation = () => {
  return useMutation({
    mutationFn: (adminId: number) => handlePostDenyTeacher(adminId),
    throwOnError: true
  }).mutate;
};
