import { useQuery } from "@tanstack/react-query";
import { handleGetBreed } from "apis/membershipApplication.api";

const useGetBreed = (inputValue: string | number) => {
  return useQuery({
    queryKey: ["getBreed"],
    queryFn: () => handleGetBreed(inputValue),
    enabled: false
  });
};

export default useGetBreed;
