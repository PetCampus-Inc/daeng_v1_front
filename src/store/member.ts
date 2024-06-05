import { atom } from "recoil";
import { IMemberDogInfo } from "types/member/main.types";

interface ISchool {
  schoolName: string;
  schoolId: number;
}

const IS_REJECTED = localStorage.getItem("IS_REJECTED");

export const memberEnrollmentSchoolAtom = atom<ISchool | null>({
  key: "memberEnrollmentSchool",
  default: null
});

// 강아지 승인 거절 데이터 atom
export const memberEnrollmentRejectedAtom = atom({
  key: "isRejectedState",
  default: IS_REJECTED ? JSON.parse(IS_REJECTED) : false
});

export const memberEnrollmentDogDetailAtom = atom<IMemberDogInfo | null>({
  key: "memberEnrollmentDogDetail",
  default: null
});

// FIXME: selector로 변경 필요!!
export const dogIdState = atom<number | null>({
  key: "dogId",
  default: null
});
