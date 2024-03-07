import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetNewEnrollment } from "apis/admin.api";

const useGetNewEnrollment = (adminId: number, schoolId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.NEW_ENROLLMENT_LIST(adminId),
    queryFn: () => handleGetNewEnrollment(adminId, schoolId),
    enabled: false
  });
};

export default useGetNewEnrollment;
