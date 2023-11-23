import { atom } from "recoil";
import {
  IAttendanceInfo,
  IAdminLoginResponse,
  IAttendDogsInfo,
  IAttendCareDogInfo,
} from "types/Attendance.type";

export const dogListInfoAtom = atom<IAttendanceInfo>({
  key: "dogListInfoAtom",
  default: {
    data: [
      {
        dogId: -1,
        dogName: "",
        allRounds: -1,
        currentRounds: -1,
        monthlyTicket: [],
      },
    ],
    status: 0,
  },
});

export const adminLoginInfoAtom = atom<IAdminLoginResponse>({
  key: "adminLoginInfoAtom",
  default: {
    data: {
      adminId: -1,
      adminName: "",
      schoolId: -1,
      role: "",
      schoolName: "",
    },
    status: 0,
  },
});

export const attendDogListInfoAtom = atom<IAttendDogsInfo>({
  key: "attendDogListInfoAtom",
  default: {
    data: [
      {
        attendanceId: -1,
        dogId: -1,
        dogName: "",
        allRounds: -1,
        currentRounds: -1,
        monthlyTicket: [],
      },
    ],
    status: 0,
  },
});

export const attendCareDogListAtom = atom<IAttendCareDogInfo>({
  key: "attendCareDogListAtom",
  default: {
    data: [
      {
        attendanceId: -1,
        dogId: -1,
        dogName: "",
        status: "",
        adminName: "",
      },
    ],
    status: 0,
  },
});
