import { atom } from "recoil";

interface ISchool {
  schoolName: string;
  schoolId: number;
}

export const memberEnrollmentSchoolAtom = atom<ISchool | null>({
  key: "memberEnrollmentSchool",
  default: null
});
