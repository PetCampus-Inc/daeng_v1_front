import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { AdminProfile } from "types/admin/admin.types";

const { persistAtom } = recoilPersist();

export const defaultAdminProfile: AdminProfile = {
  adminName: "",
  phoneNumber: "",
  profileUri: "",
  schoolId: 0,
  schoolName: ""
};

export const adminInfoState = atom<AdminProfile>({
  key: "adminInfo",
  default: defaultAdminProfile,
  effects: [persistAtom]
});
