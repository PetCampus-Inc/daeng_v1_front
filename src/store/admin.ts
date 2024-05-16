import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Role } from "types/admin/admin.type";

import type { TAdminLoginInfo } from "types/admin/admin.type";
import type { AttendData, ITicketDetail } from "types/admin.attendance.type";
import type { INewEnrollmentList } from "types/Admin.type";

const { persistAtom } = recoilPersist();

// FIXME: default값 null로 교체 예정
export const initAdminInfo: TAdminLoginInfo = {
  adminId: -1,
  adminName: "",
  schoolId: -1,
  role: Role.WITHDRAWN,
  schoolName: ""
};

export const adminLoginInfoAtom = atom<TAdminLoginInfo>({
  key: "adminLoginInfo",
  default: initAdminInfo,
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
