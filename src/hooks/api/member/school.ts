import { QUERY_KEY } from "constants/queryKey";

import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetSearchResult } from "apis/member/school.api";

export const useGetSchoolInfoList = (searchText: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.SHCOOL_INFO_LIST,
    queryFn: () => handleGetSearchResult(searchText)
  });
};
