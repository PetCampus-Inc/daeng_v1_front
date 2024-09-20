import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
interface DogProfileList {
  dogId: string;
  dogProfile: string;
}

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
