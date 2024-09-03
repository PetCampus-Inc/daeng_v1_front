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

interface DogData {
  dogId: number;
  schoolName: string;
}

export const dogState = atom<DogData | null>({
  key: "dogState",
  default: null,
  effects: [persistAtom]
});
