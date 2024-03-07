import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetTeacherList } from "apis/admin.api";

const useGetTeacherList = (adminId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.TEACHER_LIST,
    queryFn: () => handleGetTeacherList(adminId)
  });
};

export default useGetTeacherList;
