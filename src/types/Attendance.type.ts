import { IMemberInfo } from "./School.type";

export type IAttendanceInfo = IDogsList[];

export interface IAttendSearchInfo {
  data: IAttendDogLists[];
  status: number;
}

export type IAttendDogsInfo = IAttendDogLists[];

export interface IAdminLoginResponse {
  data: {
    adminId: number;
    adminName: string;
    schoolId: number;
    role: string;
    schoolName: string;
  };
  status: number;
}

export interface IDogsList {
  dogId: number;
  dogName: string;
  allRounds: number;
  currentRounds: number;
  monthlyTicket: [];
}

export interface IAttendDogLists {
  attendanceId: number;
  dogId: number;
  dogName: string;
  allRounds: number;
  currentRounds: number;
  monthlyTicket: string;
}

export interface IAttendCareDog {
  attendanceId: number;
  dogId: number;
  dogName: string;
  adminName: string | null;
  lastPhotoTime: string | null;
  agendaWriting: "COMPLETE" | "NOT_YET" | "WRITING";
}

export interface IMemberCallInfo {
  dogName: string;
  phoneNumber: string;
}

export interface IAlarmResponse {
  data: {
    dogId: number;
    dogName: string;
    allRounds: number;
    currentRounds: number;
    memberId: number;
    memberName: string;
    memberPhoneNumber: string;
    schoolId: number;
    schoolName: string;
    schoolPhoneNumber: string;
  };
  status: number;
}

export interface IAttendInfo {
  schoolId: number;
  selectedDogIds: number[];
}

export interface IAttendCareInfo {
  adminId: number;
  selectedDogId: number[];
}

// TODO: 이 부분+ 이 타입을 사용한 기존 API들 삭제해도 되는지 검토 (API변동 이슈)
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
  dogGender: string;
  dogSize: string;
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
  member: IMemberInfo;
}

export interface ITicketDetail {
  ticketType: string;
  allRoundTicket: number;
  currentRoundTicket: number;
  monthlyTicketNumber: number;
  ticketStartDate: string;
  ticketExpirationDate: string;
  attendanceDays: string[];
  ticketHistory: ITicketDetail[];
}

export interface IPrecautionInfo {
  modifiedList: number[];
  agreements: {
    21?: number[];
    22?: number[];
    23?: number[];
    24?: number[];
    30?: number[];
  };
}

export interface IDogAndMemberInfo {
  dogId: number;
  dogName: string;
  dogGender: string;
  dogSize: string;
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
  member: IMemberInfo;
}

export interface ITicketDetail {
  ticketType: string;
  allRoundTicket: number;
  currentRoundTicket: number;
  monthlyTicketNumber: number;
  ticketStartDate: string;
  ticketExpirationDate: string;
  attendanceDays: string[];
  ticketHistory: ITicketDetail[];
}

export interface IPrecautionInfo {
  modifiedList: number[];
  agreements: {
    21?: number[];
    22?: number[];
    23?: number[];
    24?: number[];
    30?: number[];
  };
}
