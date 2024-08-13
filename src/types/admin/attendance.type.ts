import type { MemberDtoType } from "./enrollment.types";
import type { Nullable } from "../helper.types";
import type { TicketType } from "types/member/enrollment.types";

type AttendanceStatus = "ATTENDED" | "NOT_ATTENDED";

/**
 *  @description 출석부 - 출석모드 Dto
 */
export interface Attend {
  attendanceId: number;
  dogId: number;
  dogName: string;
  dogProfileUri: string;
  allRounds: Nullable<number>;
  currentRounds: Nullable<number>;
  monthlyTicket: Nullable<number[]>;
  status: AttendanceStatus;
}

/**
 * @description 출석부 - 출석모드 요청 Dto
 */
export interface AttendReq {
  schoolId: number;
  adminId: number;
  attendanceIdList: number[];
}

/**
 *  @description 출석부 - 출석부 Dto
 */
export interface Attendance extends Omit<Attend, "attendanceId"> {
  attendanceId: null;
}

/**
 * @description 견주 전화번호 Dto
 */
export interface IMemberCallInfo {
  dogName: string;
  phoneNumber: string;
}

/**
 * @description 출석부 강아지 상세 - 강아지 정보 Dto
 */
export interface DogInfoDetailData {
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

/**
 * @description 출석부 강아지 상세 - 강아지 등원기록 Dto
 */
export interface DogInfoRecordData {
  date: number[];
  status: AttendanceStatus;
}

/**
 * @description 출석부 강아지 상세 - 강아지 알림장 Dto
 */
export interface DogInfoAgendaData {
  agendaId: number;
  agendaNote: string;
  snack: string;
  poop: Poop;
  poopMemo: string;
  dogId: number;
  dogProfileUri: string;
  status: "NOT_YET" | "COMPLETE" | "WRITING";
  dateTime: string;
}

export enum Poop {
  HARD = "HARD",
  HEALTHY = "HEALTHY",
  NOT_BROWN = "NOT_BROWN",
  WATERY = "WATERY",
  WARNING = "WARNING"
}

/**
 * @description 출석부 강아지 상세 - 이용권 정보 Dto
 */
export interface TicketDetailData {
  ticketType: TicketType;
  allRoundTicket: number;
  currentRoundTicket: number;
  monthlyTicketNumber: number;
  ticketStartDate: number[];
  ticketExpirationDate: Nullable<number[]>;
  attendanceDays: Nullable<string[]>;
  ticketHistory: Nullable<TicketDetailData[]>;
}
/**
 * @description 출석부 강아지 상세 - 이용권 갱신 정보 Dto
 */
export interface NewTicketData {
  ticketType: TicketType[];
  roundTicketNumber: number[];
  openDays: string[];
  monthlyTicketNumber: number[];
}

/**
 * @description 출석부 강아지 상세 - 이용권 갱신 요청 Dto
 */
export interface NewTicketReq {
  dogId: number;
  startDate: string;
  ticketType: TicketType | "";
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  attendanceDays: string[];
}

/**
 * @description 출석부 강아지 상세 - 유의사항 Dto
 */
export interface PrecautionData {
  modifiedList: Nullable<number[]>;
  agreements: [{ 21: string }, { 22: string }, { 23: string }, { 24: string }, { 30: string }];
}
