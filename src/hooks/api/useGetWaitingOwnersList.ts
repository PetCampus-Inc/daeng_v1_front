import { useQuery } from "@tanstack/react-query";
import { handleGetWaitingOwnersList } from "apis/admin.api";

const useGetWatingOwnersList = (schoolId: number) => {
  return useQuery({
    queryKey: ["getWaitingOwnersList"],
    queryFn: () => handleGetWaitingOwnersList(schoolId)
  });
};

export default useGetWatingOwnersList;
