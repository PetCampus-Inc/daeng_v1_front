import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import type { INewEnrollmentList } from "types/Admin.type";
import type { IAttendanceInfo, IAdminLoginResponse, IAttendDogsInfo } from "types/Attendance.type";

const { persistAtom } = recoilPersist();

export const dogListInfoAtom = atom<IAttendanceInfo>({
  key: "dogListInfo",
  default: []
});

// FIXME: 유저권한에 따른 라우팅 처리가 되어있지않기 때문에, 원장권한의 유저정보를 디폴트로 사용하고 있습니다.
export const adminLoginInfoAtom = atom<IAdminLoginResponse>({
  key: "adminLoginInfo",
  default: {
    data: {
      adminId: 2,
      adminName: "염원장",
      schoolId: 2,
      role: "ROLE_OWNER",
      schoolName: "귀여운강아지월드"
    },
    status: 0
  },
  effects_UNSTABLE: [persistAtom]
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
