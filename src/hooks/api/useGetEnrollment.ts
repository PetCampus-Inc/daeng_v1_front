import { useQuery } from "@tanstack/react-query";
import { handleGetEnrollment } from "apis/admin.api";

const useGetEnrollment = (adminId: number) => {
  return useQuery({
    queryKey: ["getEnrollment"],
    queryFn: () => handleGetEnrollment(adminId),
    enabled: false
  });
};

export default useGetEnrollment;
