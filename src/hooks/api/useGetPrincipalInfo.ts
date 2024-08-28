import { QUERY_KEY } from "constants/queryKey";

import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetOwnerInfo } from "apis/admin/mypage.api";

const useGetPrincipalInfo = (adminId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.PRINCIPAL_INFO,
    queryFn: () => handleGetOwnerInfo(adminId)
  });
};

export default useGetPrincipalInfo;
