import { useMutation } from "@tanstack/react-query";

import { handlePostDogMemo } from "apis/attendance";

export const useSubmitMemoMutation = () => {
  return useMutation({
    mutationFn: ({ dogId, memo }: { dogId: number; memo: string }) =>
      handlePostDogMemo(dogId, memo),
    throwOnError: true
  }).mutate;
};
