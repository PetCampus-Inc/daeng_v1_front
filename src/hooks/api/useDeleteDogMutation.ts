import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleDeleteDog } from "apis/attendance";
import showToast from "utils/showToast";

export const useDeleteDog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dogId: number) => handleDeleteDog(dogId),
    onSuccess: () => {
      showToast("강아지가 삭제되었습니다", "bottom");
      queryClient.invalidateQueries({ queryKey: ["getDogList"] });
    },

    throwOnError: true
  });
};
