import { useQuery } from "@tanstack/react-query";
import { handleGetTeacherList } from "apis/admin.api";

const useGetTeacherList = (adminId: number, schoolId: number, changed: boolean) => {
  return useQuery({
    queryKey: ["getTeacherList", changed],
    queryFn: () => handleGetTeacherList(adminId, schoolId)
  });
};

export default useGetTeacherList;
