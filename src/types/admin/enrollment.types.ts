import type { Nullable } from "types/helper.types";

export type TNeutralization = "NEUTERED" | "NOT_NEUTERED";
export type TVaccination = "VACCINATED" | "NOT_VACCINATED";
export type TTicketType = "MONTHLY" | "ROUND";
export type TDogSize = "SMALL" | "MEDIUM" | "BIG";
export type TDogGender = "MALE" | "FEMALE";
export type TMemberGender = "MALE" | "FEMALE";
export type TAttendanceStatus = "ATTENDED" | "NOT_ATTENDED";
export type TPickDropRequest = "REQUEST" | "NOT_REQUEST";
export type TPickDropType = "ROUND" | "ONE_WAY";
export type TSchoolInfo = {
  schoolId: number;
  name: string;
  phoneNumber: string;
  address: string;
};
export type TPickDropState = "RUNNING" | "NOT_RUNNING";
export type RelationType = "MOTHER" | "FATHER" | "SISTER" | "BROTHER" | "FRIEND";

// 가입신청서 조회 - 멤버 정보
export type MemberDtoType = {
  memberProfileUri: string;
  memberName: string;
  memberGender: string;
  nickName: string;
  address: string;
  addressDetail: string;
  memberAddress: string;
  phoneNumber: string;
  emergencyNumber: Nullable<string>;
  relation: RelationType;
};

// (견주가 작성한) 가입신청서 조회
export interface MemberFormData {
  enrollmentFormId: number;
  memberName: string;
  memberGender: TMemberGender;
  address: string;
  addressDetail: Nullable<string>;
  phoneNumber: string;
  emergencyNumber: Nullable<string>;
  dogName: string;
  dogGender: TDogGender;
  dogSize: TDogSize;
  breedId: number;
  breedName: Nullable<string>;
  newBreed: Nullable<string>;
  birthDate: number[];
  neutralization: TNeutralization;
  allergyDisease: string;
  vaccination: TVaccination;
  fileUrl: string;
  enrollmentTicketType: TTicketType;
  enrollmentRoundTicketNumber: number;
  enrollmentMonthlyTicketNumber: number;
  attendanceDays: string[];
  pickDropRequest: TPickDropRequest;
  pickDropType: TPickDropType;
  pickDropMemo: string;
  agreements: number[];
  schoolFormResponse: ISchoolFormResponse;
}

interface ISchoolFormResponse {
  schoolFormId: number;
  schoolFormName: string;
  requiredItemList: number[];
  priceInfo: string;
  ticketType: TTicketType[];
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
  member: Nullable<MemberDtoType>;
}

/** 원장 가입신청서 등록 Request 타입 */
export interface AdminEnrollmentInfoType {
  schoolId: number;
  formName: string;
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
  pickDropInfo: string;
  pickDropNotice: string;
}
