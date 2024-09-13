import type { Nullable, LocalDateTime, LocalDate } from "../helper.types";
import type { PoopStatus, AgendaStatus } from "types/member/dogs";
import type { TicketType } from "types/member/enrollment.types";

export const ATTENDANCE_STATUS = {
  ATTENDED: "ATTENDED",
  NOT_ATTENDED: "NOT_ATTENDED"
} as const;
export type AttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

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
  attendanceIdList: number[];
}

/**
 *  @description 출석부 - 출석부 Dto
 */
export interface Attendance extends Omit<Attend, "attendanceId" | "status"> {
  status: null;
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
  neutralization: "NEUTERED" | "NOT_NEUTERED";
  allergyDisease: Nullable<string>;
  vaccination: "VACCINATED" | "NOT_VACCINATED";
  profileUri: Nullable<string>;
  vaccinationUri: Nullable<Vaccination[]>;
  pickDropRequest: "REQUEST" | "NOT_REQUEST";
  pickDropType: Nullable<"ROUND" | "ONE_WAY">;
  pickDropMemo: Nullable<string>;
  dogMemo: Nullable<string>;
  member: Member;
}

interface Vaccination {
  imageId: number;
  imageUri: string;
  imageType: "VACCINATION";
  comment: null;
  createdTime: number[];
}

interface Member {
  memberProfileUri: null;
  memberName: string;
  memberGender: null;
  nickName: null;
  address: string;
  addressDetail: Nullable<string>;
  phoneNumber: string;
  emergencyNumber: Nullable<string>;
  relation: null;
}

/**
 * @description 출석부 강아지 상세 - 강아지 등원기록 Dto
 */
export interface DogInfoRecordData {
  date: LocalDate;
  status: AgendaStatus;
}

/**
 * @description 출석부 강아지 상세 - 강아지 알림장 Dto
 */
export interface DogInfoAgendaData {
  agendaId: number;
  agendaNote: string;
  snack: string;
  poop: PoopStatus;
  poopMemo: string;
  dogId: number;
  dogProfileUri: string;
  status: AgendaStatus;
  dateTime: LocalDateTime;
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
  ticketStartDate: LocalDate;
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
  modifiedList: number[];
  agreements: [{ 21: string }, { 22: string }, { 23: string }, { 24: string }, { 30: string }];
}
