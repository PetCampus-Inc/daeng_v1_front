import type { MemberDtoType } from "./admin/enrollment.types";
import type { Nullable } from "./helper.type";

type AttendanceStatus = "ATTENDED" | "NOT_ATTENDED";

// MEMO: 출석모드 데이터
export type AttendData = {
  attendanceId: number;
  dogId: number;
  dogName: string;
  dogProfileUri: string;
  allRounds: Nullable<number>;
  currentRounds: Nullable<number>;
  monthlyTicket: Nullable<number[]>;
  status: AttendanceStatus;
};

// MEMO: 출석부 데이터
export type AttendanceData = {
  attendanceId: null;
  dogId: number;
  dogName: string;
  dogProfileUri: string;
  allRounds: Nullable<number>;
  currentRounds: Nullable<number>;
  monthlyTicket: Nullable<number[]>;
  status: Nullable<AttendanceStatus>;
};

export interface IMemberCallInfo {
  dogName: string;
  phoneNumber: string;
}

// TODO: 이 부분+ 이 타입을 사용한 기존 API들 삭제해도 되는지 검토 (API변동 이슈)
export interface IDogDetails {
  dogId: number;
  dogName: string;
  size: string;
  gender: string;
  allRounds: number;
  currentRounds: number;
  monthlyTicket: [];
  dogAttendances: [];
  status: number;
}

export interface IDogAndMemberInfo {
  dogId: number;
  dogName: string;
  dogGender: "FEMALE" | "MALE";
  dogSize: "SMALL" | "MEDIUM" | "BIG";
  breedId: number;
  breedName: string;
  dogBirthDate: number[];
  neutralization: string;
  allergyDisease: string;
  vaccination: string;
  fileUrl: string[];
  pickDropRequest: string;
  pickDropType: string;
  pickDropMemo: string;
  dogMemo: string;
  member: MemberDtoType;
}

export interface IDogInfoRecord {
  date: number[];
  status: string; //TODO: ATTENDED 등으로 변경
}

export interface IDogInfoAgenda {
  agendaId: number;
  agendaNote: string;
  snack: string;
  poop: IPoop;
  poopMemo: string;
  dogId: number;
  status: "NOT_YET" | "COMPLETE" | "WRITING";
  date: string;
}

export type IPoop = "HARD" | "HEALTHY" | "NOT_BROWN" | "WATERY" | "WARNING" | undefined | string;

export interface ITicketDetail {
  ticketType: string;
  allRoundTicket: number;
  currentRoundTicket: number;
  monthlyTicketNumber: number;
  ticketStartDate: number[];
  ticketExpirationDate: number[];
  attendanceDays: string[];
  ticketHistory: ITicketDetail[];
}

export interface IPrecautionInfo {
  modifiedList: Nullable<number[]>;
  agreements: [{ 21: string }, { 22: string }, { 23: string }, { 24: string }, { 30: string }];
}
