import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetNewAlarm } from "apis/admin/admin.api";

const useGetNewAlarm = (adminId: number) => {
  return useSuspenseQuery({
    queryKey: ["getNewAlarm"],
    queryFn: () => handleGetNewAlarm(adminId)
  });
};

export default useGetNewAlarm;
