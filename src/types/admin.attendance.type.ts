import { Nullable } from "./helper.type";
import { IMemberInfo } from "./School.type";

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
