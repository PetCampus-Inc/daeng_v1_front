import { atom } from "recoil";

import type { IRequestAdminEnrollment } from "types/School.type";

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

export const enrollmentFormAtom = atom<IRequestAdminEnrollment>({
  key: "enrollmentFormAtom",
  default: {
    schoolId: -1,
    adminId: -1,
    formName: "",
    requiredItemList: [],
    priceInfo: "",
    ticketType: [],
    roundTicketNumber: [],
    openDays: [],
    monthlyTicketNumber: [],
    ticketInfo: "",
    limitsInfo: "",
    accidentInfo: "",
    abandonmentInfo: "",
    pickDropState: "",
    pickDropNotice: "",
    pickDropInfo: ""
  }
});
