import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePostAttend } from "apis/attendance";

const useAttendDog = () => {
  const queryClient = useQueryClient();
  const attendDogMutation = useMutation({
    mutationFn: handlePostAttend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAttendDogList"] });
    },
    throwOnError: true
  });
  return { mutateAttend: attendDogMutation.mutate };
};

export default useAttendDog;
