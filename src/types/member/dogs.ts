type Status = "NOT_YET" | "COMPLETE" | "WRITING";

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
  status: Status;
  dateTime: string;
}

/**
 * 등원기록
 */
export interface DogInfoRecord {
  date: number[];
  status: Status;
  registeredDate: number[];
}
