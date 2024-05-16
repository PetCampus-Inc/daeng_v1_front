import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { getWaitingOwnersList } from "apis/admin/admin.api";

const useGetWaitingOwnersList = (schoolId: number) => {
  return useQuery({
    queryKey: QUERY_KEY.MEMBER_WAITING_LIST,
    queryFn: () => getWaitingOwnersList(schoolId)
  });
};

export default useGetWaitingOwnersList;
