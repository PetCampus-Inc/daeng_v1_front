import { atom } from "recoil";

interface ISchool {
  schoolName: string;
  schoolId: number;
}

interface IMemberHome {
  memberId: number | null;
  dogId: number | null;
}

export const memberEnrollmentSchoolAtom = atom<ISchool | null>({
  key: "memberEnrollmentSchool",
  default: null
});

// FIXME: selector로 변경 필요!!
export const dogIdState = atom<number | null>({
  key: "dogId",
  default: null
});
