import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { getTeacherList } from "apis/admin/school.api";

const useGetTeacherList = () => {
  return useQuery({
    queryKey: QUERY_KEY.TEACHER_LIST,
    queryFn: () => getTeacherList()
  });
};

export default useGetTeacherList;
