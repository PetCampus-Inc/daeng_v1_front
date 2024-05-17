import type { Nullable } from "types/helper.type";

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
type TRoundTicketNumber = number[];
type TMonthlyTicketNumber = number[];
export type TPickDropState = "RUNNING" | "NOT_RUNNING";
export type RelationType = "MOTHER" | "FATHER" | "SISTER" | "BROTHER" | "FRIEND";
export type TMemberDto = {
  memberId: number;
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

// 견주 가입신청서 조회
export interface MemberFormData {
  enrollmentFormId: number;
  memberId: number;
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
  dogBirthDate: number[];
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
  member: Nullable<TMemberDto>;
}

// 원장 가입신청서 미리보기
export interface IResponseAdminForm {
  schoolFormId: number;
  requiredItemList: number[];
  priceInfo: string;
  ticketType: string[];
  roundTicketNumber: TRoundTicketNumber;
  openDays: string[];
  monthlyTicketNumber: TMonthlyTicketNumber;
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: TPickDropState;
  pickDropInfo: string;
  pickDropNotice: string;
  member: Nullable<TMemberDto>;
}

// 원장 가입신청서 저장
export interface IRequestAdminEnrollment {
  schoolId: number;
  adminId: number;
  formName: Nullable<string>; // TODO: submit 폼 때문에 Nullable 처리되어 있지만, 다른 방안 고려해보기
  requiredItemList: number[];
  priceInfo: string;
  ticketType: string[];
  roundTicketNumber: TRoundTicketNumber;
  openDays: string[];
  monthlyTicketNumber: TMonthlyTicketNumber;
  ticketInfo: string;
  limitsInfo: string;
  accidentInfo: string;
  abandonmentInfo: string;
  pickDropState: TPickDropState;
  pickDropInfo: string;
  pickDropNotice: string;
}
