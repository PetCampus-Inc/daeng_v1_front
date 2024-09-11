import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface ISchool {
  schoolName: string;
  schoolId: number;
}

interface DogProfileList {
  dogId: string;
  dogProfile: string;
}

const IS_REJECTED = localStorage.getItem("IS_REJECTED");

export const memberEnrollmentSchoolAtom = atom<ISchool | null>({
  key: "memberEnrollmentSchoolAtom",
  default: null
});

// 강아지 승인 거절 데이터 atom
export const memberEnrollmentRejectedAtom = atom({
  key: "isRejectedState",
  default: IS_REJECTED ? JSON.parse(IS_REJECTED) : false
});

// FIXME dogId localStorage에서 가져올 수 있는지 확인하기 (우선 임시로 적용 함)
// FIXME: selector로 변경 필요!!
export const dogIdState = atom<number | null>({
  key: "dogIdState",
  default: null,
  effects: [persistAtom]
});

// 강아지 프로필사진 여부 확인
export const dogProfileList = atom<DogProfileList[]>({
  key: "dogProfileList",
  default: []
});
