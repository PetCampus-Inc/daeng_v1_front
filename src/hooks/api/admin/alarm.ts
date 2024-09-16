import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAlarm, handleGetNewAlarm } from "apis/admin/admin.api";
import { IAlarmReq } from "types/admin/admin.types";

export const useGetNewAlarm = () => {
  return useSuspenseQuery({
    queryKey: ["getNewAlarm"],
    queryFn: () => handleGetNewAlarm()
  });
};

export const useGetAlarms = (param: IAlarmReq) => {
  return useSuspenseQuery({
    queryKey: ["getAlarms"],
    queryFn: () => handleGetAlarm(param)
  });
};
