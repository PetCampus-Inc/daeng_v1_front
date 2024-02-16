import { atom } from "recoil";
import type { IRequestForm } from "types/School.type";

export interface ImageFile {
  file: File;
  preview: string;
}

export const imagePreviewAtom = atom<ImageFile[]>({
  key: "imagePreviewAtom",
  default: []
});

export const enrollmentFormAtom = atom<IRequestForm>({
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
