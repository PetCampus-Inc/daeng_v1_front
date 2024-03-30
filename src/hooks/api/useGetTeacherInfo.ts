import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetTeacherInfo } from "apis/admin.mypage.api";

const useGetTeacherInfo = (adminId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.TEACHER_INFO,
    queryFn: () => handleGetTeacherInfo(adminId)
  });
};

export default useGetTeacherInfo;
