import { INIT_COUNTER } from "constants/option";

import { SORT_OPTIONS, type SortOptions } from "components/Admin/Attendance";
import { atom } from "recoil";

import type { Nullable } from "types/helper.types";

export const schoolIdAtom = atom<Nullable<number>>({
  key: "schoolIdAtom",
  default: null
});

export const currentStepState = atom({
  key: "currentStep",
  default: 0
});

export interface ImageFile {
  file: File;
  preview: string;
}

export const imagePreviewAtom = atom<ImageFile[]>({
  key: "imagePreviewAtom",
  default: []
});

// FIXME: 전역 상태로 관리하는 것이 맞는지 확인 필요
export const sortOptionState = atom<SortOptions>({
  key: "sortOption",
  default: SORT_OPTIONS.REGISTERED
});

export const ticketCounterState = atom<number>({
  key: "ticketCounter",
  default: INIT_COUNTER
});
