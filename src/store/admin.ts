import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { INewEnrollmentList } from "types/Admin.type";
import {
  IAttendanceInfo,
  IAdminLoginResponse,
  IAttendDogsInfo,
  IDogDetails,
  IAttendCareDog
} from "types/Attendance.type";

const { persistAtom } = recoilPersist();

export const dogListInfoAtom = atom<IAttendanceInfo>({
  key: "dogListInfoAtom",
  default: []
});

export const adminLoginInfoAtom = atom<IAdminLoginResponse>({
  key: "adminLoginInfoAtom",
  default: {
    data: {
      adminId: 1,
      adminName: "",
      schoolId: 1,
      role: "",
      schoolName: ""
    },
    status: 0
  },
  effects_UNSTABLE: [persistAtom]
});

export const attendDogListInfoAtom = atom<IAttendDogsInfo>({
  key: "attendDogListInfoAtom",
  default: []
});

export const attendCareDogListAtom = atom<IAttendCareDog[]>({
  key: "attendCareDogListAtom",
  default: []
});

export const newEnrollmentListAtom = atom<INewEnrollmentList | null>({
  key: "newEnrollmentList",
  default: null,
  effects_UNSTABLE: [persistAtom]
});
