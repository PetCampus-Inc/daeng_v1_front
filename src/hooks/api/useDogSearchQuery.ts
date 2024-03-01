import { useQuery } from "@tanstack/react-query";
import { handleGetSearchDogs } from "apis/attendance";

const useDogSearchQuery = (schoolId: number, searchText: string) => {
  return useQuery({
    queryKey: ["getDogList", schoolId, searchText],
    queryFn: () => handleGetSearchDogs(schoolId, searchText),
    enabled: !!searchText
  });
};

export default useDogSearchQuery;
