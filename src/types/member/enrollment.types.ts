import { Nullable } from "types/helper.type";
import { IResponse } from "types/Response.type";

export type PickDropStateType = "RUNNING" | "NOT_RUNNING";
export type PickDropRequestType = "REQUEST" | "NOT_REQUEST";
export type TicketType = "ROUND" | "MONTHLY";
export type MemberGenderType = "MALE" | "FEMALE";
export type RelationType = "MOTHER" | "FATHER" | "SISTER" | "BROTHER" | "FRIEND";

// 견주 가입신청서 조회
export interface EnrollmentData {
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
  pickDropState: PickDropStateType;
  pickDropNotice: string;
  pickDropInfo: string;
  member: IMemberDto;
}

export interface IMemberDto {
  memberId: number;
  memberName: string;
  memberGender: MemberGenderType;
  address: string;
  phoneNumber: string;
  emergencyNumber: Nullable<string>;
  title: Nullable<string>;
}

// 견주 가입신청서 등록
export interface EnrollmentInfo extends Omit<IMemberDto, "title"> {
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
  ticketType: TicketType;
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  attendanceDays: number[];
  pickDropRequest: PickDropRequestType;
  pickDropType: string;
  pickDropMemo: string;
  agreementList: number[];
}

export interface ISchoolFormResponse {
  schoolFormId: number;
  schoolFormName: string;
  requiredItemList: Map<number, boolean>;
  priceInfo: string;
  ticketType: string[];
  roundTicketNumber: number[];
  openDays: string[];
  monthlyTicketNumber: number[];
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: PickDropStateType;
  pickDropNotice: string;
  pickDropInfo: string;
  member: IMemberDto;
}

// 강아지 가입 신청서
export interface IDogEnrollmentInfo extends IResponse {
  enrollmentFormId: number;
  memberId: number;
  memberName: string;
  memberGender: string;
  address: string;
  addressDetail?: string;
  phoneNumber: string;
  emergencyPhoneNumber?: string;
  dogName: string;
  dogGender: string;
  dogSize: string;
  breedId: number;
  breedName: string;
  newBreed: string;
  dogBirthDate: string[];
  neutralization: string;
  allergyDisease?: string;
  vaccination: string;
  vaccinationUri?: string[];
  enrollmentTicketType: string;
  enrollmentRoundTicketNumber: number;
  enrollmentMonthlyTicketNumber: number;
  attendanceDays: string[]; // MEMO API 명세서엔 string으로 되어있음
  pickDropRequest: PickDropRequestType;
  pickDropType: string;
  pickDropMemo: string;
  agreements: number[];
  schoolFormResponse: ISchoolFormResponse;
}
