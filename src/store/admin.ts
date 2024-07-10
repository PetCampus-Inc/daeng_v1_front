import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import type { INewEnrollmentList } from "../types/admin/school.types";
const { persistAtom } = recoilPersist();

export const newEnrollmentListAtom = atom<INewEnrollmentList | null>({
  key: "newEnrollmentList",
  default: null,
  effects_UNSTABLE: [persistAtom]
});
