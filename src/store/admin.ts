import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Role } from "types/admin/admin.type";

import type { TAdminLoginInfo } from "types/admin/admin.type";
import type { IAttendDogInfo, ITicketDetail } from "types/admin.attendance.type";
import type { INewEnrollmentList } from "types/Admin.type";

const { persistAtom } = recoilPersist();

// FIXME: 권한에 따른 라우팅 처리가 되어있지않기 때문에, 임시로 원장권한의 유저정보를 사용하고 있습니다.
export const initAdminInfo: TAdminLoginInfo = {
  adminId: 2,
  adminName: "염원장",
  schoolId: 2,
  role: Role.ROLE_OWNER,
  schoolName: "귀여운강아지월드"
};

export const adminLoginInfoAtom = atom<TAdminLoginInfo>({
  key: "adminLoginInfo",
  default: initAdminInfo,
  effects_UNSTABLE: [persistAtom]
});

export const attendDogListInfoAtom = atom<IAttendDogInfo[]>({
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
