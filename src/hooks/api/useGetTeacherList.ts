import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { getTeacherList } from "apis/admin/admin.api";

const useGetTeacherList = (adminId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.TEACHER_LIST,
    queryFn: () => getTeacherList(adminId)
  });
};

export default useGetTeacherList;
