import type { LocalDate } from "types/helper.types";

export const AGENDA_STATUS = {
  NOT_YET: "NOT_YET",
  COMPLETE: "COMPLETE",
  WRITING: "WRITING"
} as const;
export type AgendaStatus = (typeof AGENDA_STATUS)[keyof typeof AGENDA_STATUS];

export const POOP_STATUS = {
  HARD: "HARD",
  HEALTHY: "HEALTHY",
  NOT_BROWN: "NOT_BROWN",
  WATERY: "WATERY",
  WARNING: "WARNING"
} as const;
export type PoopStatus = (typeof POOP_STATUS)[keyof typeof POOP_STATUS];

/**
 * 강아지 상세 - 알림장 Dto
 */
export interface DogInfoAgenda {
  agendaId: number;
  agendaNote: string;
  snack: string;
  poop: PoopStatus;
  poopMemo: string;
  dogId: number;
  dogProfileUri: string;
  status: AgendaStatus;
  dateTime: string;
}

/**
 * 등원기록
 */
export interface DogInfoRecord {
  date: LocalDate[];
  registeredDate: LocalDate;
}
