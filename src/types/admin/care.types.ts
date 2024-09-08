import type { Poop } from "./attendance.type";
import type { Nullable } from "../helper.types";

export interface ICareDogProps {
  selectedDogId: number[];
}

export interface ICareDogInfo {
  attendanceId: number;
  dogId: number;
  dogName: string;
  adminName: Nullable<string>;
  profileUri: string;
  lastPhotoTime: Nullable<string>;
  agendaWriting: TAgendaWriting;
  conflicted: boolean;
}

export type TAgendaWriting = "COMPLETE" | "NOT_YET" | "WRITING";

export interface IReqGallery {
  dogIdList: number[];
  imageUriList: string[];
  comment?: string;
}

export interface ICareTempSave {
  agendaId: number;
  dogId: number;
  agendaNote: string;
  snack: string;
  poop: Poop;
  poopMemo: string;
}

export interface IPastAgenda extends ICareTempSave {
  dateTime: number[];
  status: TAgendaWriting;
}
