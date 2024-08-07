import { useMutation } from "@tanstack/react-query";
import { postDeleteTeacher } from "apis/admin/school.api";

const useTeacherDeleteMutation = () => {
  return useMutation({
    mutationFn: (adminId: number) => postDeleteTeacher(adminId),
    throwOnError: true
  }).mutate;
};

export default useTeacherDeleteMutation;
