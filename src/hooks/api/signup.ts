import { useQuery } from "@tanstack/react-query";
import { handleGetSchool } from "apis/member/school.api";

const useGetSchool = (searchText: string) => {
  return useQuery({
    queryKey: ["schoolList", searchText],
    queryFn: () => handleGetSchool(searchText),
    enabled: !!searchText, // 입력값이 있을 때만 실행,
    staleTime: 60 * 1000, // 1분동안 캐시된 데이터 사용
    gcTime: 5 * 60 * 1000 // 비활성 캐시는 5분동안 유지
  });
};

export { useGetSchool };
