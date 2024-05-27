import { QUERY_KEY } from "constants/queryKey";

import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { handleGetSearchResult, handlePostMemberDogSchool } from "apis/member/enrollment.api";
import { handleGetMemberDogSchool } from "apis/member/member.api";

export const useGetSchoolInfoList = (searchText: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.SCHOOL_INFO_LIST,
    queryFn: () => handleGetSearchResult(searchText)
  });
};

// 유치원 연결 끊기
export const usePostMemberDogSchool = (dogId: string) => {
  const queryClient = useQueryClient();
  const enrollMemberDogSchoolMutation = useMutation({
    mutationFn: (dogId: string) => handlePostMemberDogSchool(dogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_SCHOOL_INFO(dogId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.MEMBER_MAIN_DOG_LIST });
    },
    onError: (err) => {
      console.log(err);
    }
  });

  return enrollMemberDogSchoolMutation.mutate;
};

export const useGetDogSchoolInfo = (dogId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.DOG_SHCOOL_INFO,
    queryFn: () => handleGetMemberDogSchool(dogId)
  });
};
