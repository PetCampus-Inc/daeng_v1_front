import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetSearchDogs } from "apis/attendance";

const useDogSearchQuery = (schoolId: number, searchText: string) => {
  return useQuery({
    queryKey: QUERY_KEY.ATTENDANCE_LIST_SEARCH(schoolId, searchText),
    queryFn: () => handleGetSearchDogs(schoolId, searchText),
    enabled: !!searchText
  });
};

export default useDogSearchQuery;
