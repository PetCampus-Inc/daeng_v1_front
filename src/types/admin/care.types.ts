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
