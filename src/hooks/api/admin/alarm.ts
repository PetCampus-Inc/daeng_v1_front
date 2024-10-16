import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAlarm, handleGetNewAlarm } from "apis/admin/admin.api";
import { IAlarmReq } from "types/admin/admin.types";

export const useGetNewAlarm = (adminId: number) => {
  return useSuspenseQuery({
    queryKey: ["getNewAlarm", adminId],
    queryFn: () => handleGetNewAlarm(adminId)
  });
};

export const useGetAlarms = (param: IAlarmReq) => {
  return useSuspenseQuery({
    queryKey: ["getAlarms"],
    queryFn: () => handleGetAlarm(param)
  });
};
