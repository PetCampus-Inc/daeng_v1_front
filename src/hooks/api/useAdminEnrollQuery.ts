import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAdminForm } from "apis/school.api";
import { Adapter } from "libs/Adapter";
import { ReadModeAdapter, EditModeAdapter } from "libs/Adapter/ServerToFormAdapter";

import type { IAdminEnrollment } from "types/School.type";

export type AdaptedData<Mode extends "READ" | "EDIT"> = Omit<
  IAdminEnrollment,
  "requiredItemList" | "pickDropState" | "roundTicketNumber" | "monthlyTicketNumber"
> & {
  requiredItemList: Mode extends "READ" ? Map<number, boolean> : boolean[];
  pickDropState: string;
  roundTicketNumber: Mode extends "READ"
    ? number[]
    : {
        value: number;
      }[];
  monthlyTicketNumber: Mode extends "READ"
    ? number[]
    : {
        value: number;
      }[];
};

type Mode = "READ" | "EDIT";

export const useAdminEnrollQuery = (formId: string, mode: Mode) => {
  const enlistmentQuery = useSuspenseQuery<IAdminEnrollment, Error, AdaptedData<typeof mode>>({
    queryKey: ["enrollment", formId],
    queryFn: () => handleGetAdminForm({ formId }),
    select: (data) =>
      Adapter.from(data).to<IAdminEnrollment, AdaptedData<typeof mode>>((item) => {
        const adapterInstance =
          mode === "READ" ? new ReadModeAdapter(item) : new EditModeAdapter(item);
        return adapterInstance.adapt();
      })
  });

  return enlistmentQuery;
};
