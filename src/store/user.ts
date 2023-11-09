import { atom } from "recoil";
import { IUserInfo } from "types/Member.type";

export const userInfoAtom = atom<IUserInfo>({
  key: "userInfoAtom",
  default: {
    name: "",
    userId: 0,
  },
});
