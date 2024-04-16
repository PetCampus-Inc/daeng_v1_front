import { QUERY_KEY } from "constants/queryKey";

import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetPrincipalInfo } from "apis/admin.mypage.api";

const useGetPrincipalInfo = (adminId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.PRINCIPAL_INFO,
    queryFn: () => handleGetPrincipalInfo(adminId)
  });
};

export default useGetPrincipalInfo;
