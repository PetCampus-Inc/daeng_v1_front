import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetBreed } from "apis/member/school.api";

const useGetBreed = (inputValue: string) => {
  return useQuery({
    queryKey: QUERY_KEY.BREED(inputValue),
    queryFn: () => handleGetBreed(inputValue),
    placeholderData: (previousData) => previousData,
    enabled: !!inputValue, // 입력값이 있을 때만 실행,
    staleTime: 60 * 1000, // 1분동안 캐시된 데이터 사용
    gcTime: 5 * 60 * 1000 // 비활성 캐시는 5분동안 유지
  });
};

export default useGetBreed;
