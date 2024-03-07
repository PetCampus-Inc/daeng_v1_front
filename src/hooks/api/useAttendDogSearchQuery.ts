import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetAttendSearchDogs } from "apis/attendance";

const useAttendDogSearchQuery = (schoolId: number, searchText: string) => {
  return useQuery({
    queryKey: QUERY_KEY.ATTEND_LIST_SEARCH(schoolId, searchText),
    queryFn: () => handleGetAttendSearchDogs(schoolId, searchText),
    enabled: !!searchText
  });
};

export default useAttendDogSearchQuery;
