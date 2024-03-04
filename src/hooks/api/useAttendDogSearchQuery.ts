import { useQuery } from "@tanstack/react-query";
import { handleGetAttendSearchDogs } from "apis/attendance";

const useAttendDogSearchQuery = (schoolId: number, searchText: string) => {
  return useQuery({
    queryKey: ["getAttendDogList", schoolId, searchText],
    queryFn: () => handleGetAttendSearchDogs(schoolId, searchText),
    enabled: !!searchText
  });
};

export default useAttendDogSearchQuery;
