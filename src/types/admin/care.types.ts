import type { Nullable } from "../helper.types";
import type { AgendaStatus } from "types/common/status.types";
import type { PoopStatus } from "types/member/dogs";

export interface ICareDogProps {
  selectedDogId: number[];
}

export interface CareDogInfo {
  attendanceId: number;
  dogId: number;
  dogName: string;
  adminName: Nullable<string>;
  profileUri: string;
  lastPhotoTime: Nullable<string>;
  agendaWriting: AgendaStatus;
  conflicted: boolean;
}

export interface IReqGallery {
  dogIdList: number[];
  imageUriList: string[];
  comment?: string;
}

export interface CareTempSave {
  agendaId: number;
  dogId: number;
  agendaNote: string;
  snack: string;
  poop: PoopStatus;
  poopMemo: string;
}

export interface PastAgenda extends CareTempSave {
  dateTime: number[];
  status: AgendaStatus;
}
