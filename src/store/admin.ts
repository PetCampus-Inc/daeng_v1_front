import { atom } from "recoil";
import { IAdminInfo, IAdminLoginResponse } from "types/Attendance.type";

export const adminInfoAtom = atom<IAdminInfo>({
  key: "adminInfoAtom",
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
    },
    status: 0,
  },
});
