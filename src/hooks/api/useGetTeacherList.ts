import { useQuery } from "@tanstack/react-query";
import { handleGetTeacherList } from "apis/admin.api";

const useGetTeacherList = (adminId: number, schoolId: number) => {
  return useQuery({
    queryKey: ["getTeacherList"],
    queryFn: () => handleGetTeacherList(adminId, schoolId)
  });
};

export default useGetTeacherList;
