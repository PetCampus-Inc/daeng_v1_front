import { QUERY_KEY } from "constants/queryKey";

import { useQuery } from "@tanstack/react-query";
import { handleGetBreed } from "apis/member/school.api";

const useGetBreed = (inputValue: string) => {
  return useQuery({
    queryKey: QUERY_KEY.BREED,
    queryFn: () => handleGetBreed(inputValue),
    enabled: false
  });
};

export default useGetBreed;
