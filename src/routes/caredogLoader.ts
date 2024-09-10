import { QUERY_KEY } from "constants/queryKey";

import { QueryClient } from "@tanstack/react-query";
import { handleGetCareDogs } from "apis/admin/care.api";

const caredogLoader = async ({ queryClient }: { queryClient: QueryClient }) => {
  const data = await queryClient.ensureQueryData({
    queryKey: QUERY_KEY.CARE_DOG_LIST,
    queryFn: () => handleGetCareDogs(),
    gcTime: 60 * 60 * 1000, // 1시간 동안 캐시로 저장
    staleTime: 5 * 60 * 1000 // 5분 이내에는 캐시된 결과 사용
  });
  return data;
};

export default caredogLoader;
