import { useMutation } from "@tanstack/react-query";
import { handlePostTicket } from "apis/admin/attendance.api";
import showToast from "utils/showToast";

export const useNewTicketMutation = (close?: any) => {
  return useMutation({
    mutationFn: (req: any) => handlePostTicket(req),
    onError: () => {
      showToast("갱신을 실패했습니다. 다시 시도해주세요.", "bottom");
    },
    onSuccess: () => {
      close && close();
    },
    throwOnError: true
  }).mutate;
};
