import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { handleGetSearchResult, handlePostMemberDogSchool } from "apis/member/school.api";

export const useGetSchoolInfoList = (searchText: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.SHCOOL_INFO_LIST,
    queryFn: () => handleGetSearchResult(searchText)
  });
};

// 유치원 연결 끊기
export const usePostMemberDogSchool = (dogId: string) => {
  const queryClient = useQueryClient();
  const enrollMemberDOgMutation = useMutation({
    mutationFn: (dogId: string) => handlePostMemberDogSchool(dogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_SCHOOL_INFO(dogId) });
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return enrollMemberDOgMutation.mutate;
};
