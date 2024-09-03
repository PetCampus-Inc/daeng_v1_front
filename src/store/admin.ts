import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { AdminAuthType } from "types/admin/admin.types";

import type { INewEnrollmentList } from "../types/admin/school.types";

const { persistAtom } = recoilPersist();

export const adminInfoState = atom<AdminAuthType | null>({
  key: "adminInfo",
  default: null,
  effects: [persistAtom]
});

export const newEnrollmentListAtom = atom<INewEnrollmentList | null>({
  key: "newEnrollmentList",
  default: null,
  effects: [persistAtom]
});
