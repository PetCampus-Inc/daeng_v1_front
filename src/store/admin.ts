import { atom } from "recoil";
import { IAdminInfo } from "types/Attendance.type";

export const adminInfoAtom = atom<IAdminInfo>({
  key: "adminInfoAtom",
  default: {
    data: {
      adminName: "",
      role: "",
      dogs: [
        {
          dogId: 0,
          dogName: "",
          allRounds: 0,
          currentRounds: 0,
        },
      ],
    },
    status: 0,
  },
});
