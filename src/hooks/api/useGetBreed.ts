import { useQuery } from "@tanstack/react-query";
import { handleGetBreed } from "apis/school.api";

const useGetBreed = (inputValue: string) => {
  return useQuery({
    queryKey: ["getBreed"],
    queryFn: () => handleGetBreed(inputValue),
    enabled: false
  });
};

export default useGetBreed;
