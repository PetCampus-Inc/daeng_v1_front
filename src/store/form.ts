import { atom } from "recoil";

import type { Nullable } from "types/helper.type";

export const schoolIdAtom = atom<Nullable<number>>({
  key: "schoolIdAtom",
  default: null
});

export const currentStepState = atom({
  key: "currentStepState",
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
