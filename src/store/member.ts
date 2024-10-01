import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface DogEnrollmentStatus {
  status: "CREATE" | "RE_SCHOOL";
}

// FIXME dogId localStorage에서 가져올 수 있는지 확인하기 (우선 임시로 적용 함)
// FIXME: selector로 변경 필요!!
export const dogIdState = atom<number | null>({
  key: "dogIdState",
  default: null,
  effects: [persistAtom]
});

export const dogEnrollmentStatus = atom<DogEnrollmentStatus | null>({
  key: "dogEnrollmentStatus",
  default: null
});
