import { QUERY_KEY } from "constants/queryKey";

import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetTeacherInfo } from "apis/admin/mypage.api";

const useGetTeacherInfo = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.TEACHER_INFO,
    queryFn: () => handleGetTeacherInfo()
  });
};

export default useGetTeacherInfo;
