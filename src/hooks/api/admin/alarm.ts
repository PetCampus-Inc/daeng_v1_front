import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAlarm, handleGetNewAlarm } from "apis/admin/admin.api";
import { IAlarmReq } from "types/admin/admin.types";

const useGetNewAlarm = (adminId: number) => {
  return useSuspenseQuery({
    queryKey: ["getNewAlarm"],
    queryFn: () => handleGetNewAlarm(adminId)
  });
};

export default useGetNewAlarm;

const useGetAlarms = (param: IAlarmReq) => {
  return useSuspenseQuery({
    queryKey: ["getAlarms"],
    queryFn: () => handleGetAlarm(param)
  });
};
