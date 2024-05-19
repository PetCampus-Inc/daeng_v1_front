import { atom } from "recoil";

import type { AdminFormSaveType } from "types/admin/enrollment.types";
import type { Nullable } from "types/helper.type";
import type { TMemberDto } from "types/member/enrollment.types";

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

export const enrollmentFormAtom = atom<AdminFormSaveType>({
  key: "enrollmentFormAtom",
  default: {
    schoolId: -1,
    adminId: -1,
    formName: null,
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
    pickDropState: "NOT_RUNNING",
    pickDropNotice: "",
    pickDropInfo: ""
  }
});

type memberInfoType = {
  member: Omit<TMemberDto, "title">;
  schoolFormId: number;
  schoolFormName: string;
};

export const memberInfoState = atom<memberInfoType>({
  key: "memberInfoAtom",
  default: {
    member: {
      memberId: -1,
      memberName: "",
      memberGender: "",
      address: "",
      phoneNumber: "",
      emergencyNumber: null
    },
    schoolFormId: -1,
    schoolFormName: ""
  }
});
