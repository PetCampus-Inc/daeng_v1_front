import { atom } from "recoil";

interface ISchool {
  schoolName: string;
  schoolId: number;
}

export const memberEnrollmentSchoolAtom = atom<ISchool | null>({
  key: "memberEnrollmentSchoolAtom",
  default: null
});

// FIXME: selector로 변경 필요!!
export const dogIdState = atom<number | null>({
  key: "dogId",
  default: null
});
