import { INIT_COUNTER } from "constants/option";

import { atom } from "recoil";

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

export const ticketCounterState = atom<number>({
  key: "ticketCounter",
  default: INIT_COUNTER
});
