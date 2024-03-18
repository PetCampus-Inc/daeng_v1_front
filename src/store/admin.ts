import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import type { INewEnrollmentList } from "types/Admin.type";
import type { TAdminLoginInfo } from "types/admin.userInfo.type";
import type { IAttendanceInfo, IAttendDogsInfo } from "types/Attendance.type";

const { persistAtom } = recoilPersist();

// FIXME: 권한에 따른 라우팅 처리가 되어있지않기 때문에, 임시로 원장권한의 유저정보를 사용하고 있습니다.
export const initAdminInfo: TAdminLoginInfo = {
  adminId: 2,
  adminName: "염원장",
  schoolId: 2,
  role: "ROLE_OWNER",
  schoolName: "귀여운강아지월드"
};

export const adminLoginInfoAtom = atom<TAdminLoginInfo>({
  key: "adminLoginInfo",
  default: initAdminInfo,
  effects_UNSTABLE: [persistAtom]
});

export const dogListInfoAtom = atom<IAttendanceInfo>({
  key: "dogListInfo",
  default: []
});

export const attendDogListInfoAtom = atom<IAttendDogsInfo>({
  key: "attendDogListInfo",
  default: []
});

export const newEnrollmentListAtom = atom<INewEnrollmentList | null>({
  key: "newEnrollmentList",
  default: null,
  effects_UNSTABLE: [persistAtom]
});
