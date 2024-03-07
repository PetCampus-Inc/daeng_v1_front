import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetWaitingOwnersList } from "apis/admin.api";

const useGetWaitingOwnersList = (schoolId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.MEMBER_WAITING_LIST,
    queryFn: () => handleGetWaitingOwnersList(schoolId)
  });
};

export default useGetWaitingOwnersList;
