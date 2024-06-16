import { INIT_COUNTER, LIST, type TSortOptionList } from "constants/option";

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

export const sortOptionState = atom<TSortOptionList>({
  key: "sortOption",
  default: LIST.REGISTERED
});

export const ticketCounterState = atom<number>({
  key: "ticketCounter",
  default: INIT_COUNTER
});
