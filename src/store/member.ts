import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface ISchool {
  schoolName: string;
  schoolId: number;
}

export const memberEnrollmentSchoolAtom = atom<ISchool | null>({
  key: "memberEnrollmentSchoolAtom",
  default: null
});

export const dogIdState = atom<number | null>({
  key: "dogIdState",
  default: null,
  effects: [persistAtom]
});
