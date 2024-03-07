import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handlePostAttend } from "apis/attendance";

const useAttendDog = () => {
  const queryClient = useQueryClient();
  const attendDogMutation = useMutation({
    mutationFn: handlePostAttend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.ATTENDANCE_LIST });
    },
    throwOnError: true
  });
  return { mutateAttend: attendDogMutation.mutate };
};

export default useAttendDog;
