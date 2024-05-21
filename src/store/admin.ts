import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import type { TAdminLoginInfo } from "types/admin/admin.type";
import type { AttendData, ITicketDetail } from "types/admin.attendance.type";
import type { INewEnrollmentList } from "types/Admin.type";
import type { Nullable } from "types/helper.type";

const { persistAtom } = recoilPersist();

export const adminInfoState = atom<Nullable<TAdminLoginInfo>>({
  key: "adminLoginInfo",
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export const attendDogListInfoAtom = atom<AttendData[]>({
  key: "attendDogListInfo",
  default: []
});

export const newEnrollmentListAtom = atom<INewEnrollmentList | null>({
  key: "newEnrollmentList",
  default: null,
  effects_UNSTABLE: [persistAtom]
});

export const newTicketCardDataAtom = atom<Omit<ITicketDetail, "ticketHistory"> | null>({
  key: "newTicketCardData",
  default: null,
  effects_UNSTABLE: [persistAtom]
});
