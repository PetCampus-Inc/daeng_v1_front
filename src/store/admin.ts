import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import type { INewEnrollmentList } from "../types/admin/school.types";
import type { TicketDetailData } from "types/admin/attendance.type";

const { persistAtom } = recoilPersist();

export const newEnrollmentListAtom = atom<INewEnrollmentList | null>({
  key: "newEnrollmentList",
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export const newTicketCardDataAtom = atom<Omit<TicketDetailData, "ticketHistory"> | null>({
  key: "newTicketCardData",
  default: null,
  effects_UNSTABLE: [persistAtom]
});
