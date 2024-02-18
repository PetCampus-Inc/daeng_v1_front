import { useMutation } from "@tanstack/react-query";
import { handleDeleteTeacher } from "apis/admin.api";

const useTeacherDeleteMutation = () => {
  return useMutation({
    mutationFn: (adminId: number) => handleDeleteTeacher(adminId),
    throwOnError: true
  }).mutate;
};

export default useTeacherDeleteMutation;
