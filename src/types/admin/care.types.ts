import type { Nullable } from "../helper.type";

export interface ICareDogProps {
  adminId: number;
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

export interface ICareTempSave {
  agendaId: number;
  adminId: number;
  dogId: number;
  agendaNote: string;
  snack: string;
  poop: string;
  poopMemo: string;
}

export interface IPastAgenda extends ICareTempSave {
  dateTime: number[];
  status: "COMPLETE" | "NOT_YET" | "WRITING";
}
