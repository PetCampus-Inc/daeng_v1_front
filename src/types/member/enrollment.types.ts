import { Nullable } from "types/helper.type";

import { IMemberProfileInfo } from "./home.types";

export type TPickDropState = "RUNNING" | "NOT_RUNNING";
export type TPickDropRequest = "REQUEST" | "NOT_REQUEST";
export type TTicketType = "ROUND" | "MONTHLY";

// 견주 가입신청서 조회
export interface IResponseEnrollment {
  schoolFormId: number;
  schoolFormName: string;
  requiredItemList: number[];
  priceInfo: string;
  ticketType: string[];
  roundTicketNumber: number[];
  openDays: string[];
  monthlyTicketNumber: number[];
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: TPickDropState;
  pickDropNotice: string;
  pickDropInfo: string;
  member: TMemberDto;
}

export interface TMemberDto {
  memberId: number;
  memberName: string;
  memberGender: string;
  address: string;
  phoneNumber: string;
  emergencyNumber: Nullable<string>;
  title: Nullable<string>;
}

// 견주 가입신청서 등록
export interface IRequestEnrollment extends Omit<TMemberDto, "title"> {
  schoolFormId: number;
  dogName: string;
  dogGender: string;
  dogSize: string;
  breedId: number;
  newBreed: string;
  birthDate: string;
  neutralization: string;
  vaccination: string;
  fileUrl: string;
  allergyDisease: string;
  ticketType: TTicketType;
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  attendanceDays: number[];
  pickDropRequest: TPickDropRequest;
  pickDropType: string;
  pickDropMemo: string;
  agreementList: number[];
}

interface IschoolFormResponse {
  schoolFormId: number;
  schoolFormName: string;
  requiredItemList: number[];
  priceInfo: string;
  ticketType: string[];
  roundTicketNumber: number[];
  openDays: string[];
  monthlyTicketNumber: number[];
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: string;
  pickDropNotice: string;
  pickDropInfo: string;
  member: IMemberProfileInfo;
}

// 강아지 가입 신청서
export interface IRequestEnrollment {
  enrollmentFormId: number;
  memberId: number;
  memberName: string;
  memberGender: string;
  address: string;
  addressDetail: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  dogName: string;
  dogGender: string;
  dogSize: string;
  breedId: number;
  breedName: string;
  newBreed: string;
  dogBirthDate: string;
  neutralization: string;
  allergyDisease: string;
  vaccination: string;
  vaccinationUri: string[];
  enrollmentTicketType: string;
  enrollmentRoundTicketNumber: number;
  enrollmentMonthlyTicketNumber: number;
  attendanceDays: number[]; // MEMO API 명세서엔 string으로 되어있음
  pickDropRequest: TPickDropRequest;
  pickDropType: string;
  pickDropMemo: string;
  agreements: number[];
  schoolFormResponse: IschoolFormResponse;
}
