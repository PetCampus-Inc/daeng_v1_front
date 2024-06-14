import type { MemberDtoType } from "./enrollment.types";
import type { Nullable } from "../helper.types";

type AttendanceStatus = "ATTENDED" | "NOT_ATTENDED";

/**
 *  @description 출석모드 Dto
 */
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

/**
 *  @description 출석부 Dto
 */
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

/**
 * @description 견주 전화번호 Dto
 */
export interface IMemberCallInfo {
  dogName: string;
  phoneNumber: string;
}

export interface IDogAndMemberInfo {
  dogId: number;
  dogName: string;
  dogGender: "FEMALE" | "MALE";
  dogSize: "SMALL" | "MEDIUM" | "BIG";
  breedId: number;
  breedName: string;
  birthDate: number[];
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
