import { useMutation, useQuery } from "@tanstack/react-query";
import { getCheckId, postRegistrationNumber } from "apis/admin/admin.api";
import { handleGetSchool } from "apis/member/school.api";

// 유치원 검색
export const useGetSchool = (searchText: string) => {
  return useQuery({
    queryKey: ["schoolList", searchText],
    queryFn: () => handleGetSchool(searchText),
    enabled: !!searchText, // 입력값이 있을 때만 실행,
    staleTime: 60 * 1000, // 1분동안 캐시된 데이터 사용
    gcTime: 5 * 60 * 1000 // 비활성 캐시는 5분동안 유지
  });
};

// 아이디 중복 확인
export const useCheckId = () => {
  const { mutate } = useMutation({
    mutationFn: getCheckId
  });

  return { mutateCheckId: mutate };
};

// 사업자 등록번호 확인
export const useCheckRegNum = () => {
  const { mutate } = useMutation({
    mutationFn: postRegistrationNumber
  });

  return { mutateCheckRegNum: mutate };
};
