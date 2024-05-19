import { TMemberDto } from "./admin/enrollment.types";

import type { Nullable } from "./helper.type";

export interface IAttendDogInfo {
  attendanceId: number;
  dogId: number;
  dogName: string;
  allRounds: Nullable<number>;
  currentRounds: Nullable<number>;
  monthlyTicket: Nullable<number[]>;
}

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
  member: TMemberDto;
}

export interface IDogAllDetails {
  dogId: number;
  dogName: string;
  dogGender: "FEMALE" | "MALE";
  dogSize: "SMALL" | "MEDIUM" | "BIG";
  breedId: number;
  breedName: string;
  dogBirthDate: number[];
  neutralization: "NEUTERED" | "NOT_NEUTERED";
  allergyDisease: string;
  vaccination: "VACCINATED" | "NOT_VACCINATED";
  vaccinationUrl: string;
  fileUrl: string[];
  pickDropRequest: "NOT_REQUEST" | "NOT_RUNNING" | "ONE_WAY" | "REQUEST" | "ROUND" | "RUNNING";
  pickDropType: "NOT_REQUEST" | "NOT_RUNNING" | "ONE_WAY" | "REQUEST" | "ROUND" | "RUNNING";
  pickDropMemo: string;
  dogMemo: string;
  profileUrl: string;
}

export interface IMemberAllDetails {
  memberId: number;
  memberName: string;
  nickName: string;
  phoneNumber: string;
  relation: "BROTHER" | "SISTER" | "FATHER" | "MOTHER" | "FRIEND";
  address: string;
  addressDetail: string;
  emergencyPhoneNumber: Nullable<string>;
  memberGender: "FEMALE" | "MALE";
}

export interface IDogAndMemberInfoForDetail extends IDogAllDetails {
  member: IMemberAllDetails;
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
