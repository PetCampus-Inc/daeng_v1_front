import { useSuspenseQuery } from "@tanstack/react-query";
import { handleGetAdminForm } from "apis/school.api";
import { Adapter } from "libs/Adapter";
import { ServerToFormAdapter } from "libs/Adapter/ServerToFormAdapter";

import type { IAdminEnrollment } from "types/School.type";

type AdaptedData = Omit<
  IAdminEnrollment,
  "requiredItemList" | "roundTicketNumber" | "monthlyTicketNumber" | "ticketType" | "pickDropState"
>;

export const useAdminEnrollQuery = (formId: string) => {
  const enlistmentQuery = useSuspenseQuery<IAdminEnrollment, Error, AdaptedData>({
    queryKey: ["enrollment", formId],
    queryFn: () => handleGetAdminForm({ formId }),
    select: (data) =>
      Adapter.from(data).to<IAdminEnrollment, AdaptedData>((item) =>
        new ServerToFormAdapter(item).adapt()
      )
  });

  return enlistmentQuery;
};
