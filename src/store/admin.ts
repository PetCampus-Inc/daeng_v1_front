import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { AdminAuthType } from "types/admin/admin.types";

const { persistAtom } = recoilPersist();

export const adminInfoState = atom<AdminAuthType | null>({
  key: "adminInfo",
  default: null,
  effects: [persistAtom]
});
