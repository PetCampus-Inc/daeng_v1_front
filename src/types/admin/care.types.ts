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
  lastPhotoTime: Nullable<string>;
  agendaWriting: TAgendaWriting;
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
