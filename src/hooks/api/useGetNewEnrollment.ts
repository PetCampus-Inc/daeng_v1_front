import { useQuery } from "@tanstack/react-query";
import { handleGetNewEnrollment } from "apis/admin.api";

const useGetNewEnrollment = (adminId: number, schoolId: number) => {
  return useQuery({
    queryKey: ["getNewEnrollment"],
    queryFn: () => handleGetNewEnrollment(adminId, schoolId),
    enabled: false
  });
};

export default useGetNewEnrollment;
