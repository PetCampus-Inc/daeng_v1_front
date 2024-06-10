import type { IResponse } from "types/Response.type";

export type NeutralizationType = "NEUTERED" | "NOT_NEUTERED";
export type VaccinationType = "VACCINATED" | "NOT_VACCINATED";
export type DogSizeType = "SMALL" | "MEDIUM" | "BIG";
export type DogGenderType = "MALE" | "FEMALE";
export type PickDropType = "ROUND" | "ONE_WAY";
export type PickDropStateType = "RUNNING" | "NOT_RUNNING";
export type PickDropRequestType = "REQUEST" | "NOT_REQUEST";
export type TicketType = "ROUND" | "MONTHLY";
export type MemberGenderType = "MALE" | "FEMALE";
export type RelationType = "MOTHER" | "FATHER" | "SISTER" | "BROTHER" | "FRIEND";

// 가입신청서 폼 조회
export interface EnrollmentDataType {
  schoolFormId: number;
  schoolFormName: string;
  requiredItemList: number[];
  priceInfo: string;
  ticketType: TicketType[];
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
  member: MemberDtoType;
}

// 가입신청서 폼 조회 - 멤버 정보
export interface MemberDtoType {
  address: string;
  addressDetail: string;
  emergencyPhoneNumber: string;
  memberGender: MemberGenderType;
  memberId: number;
  memberName: string;
  memberProfileUri: string;
  nickName: string;
  phoneNumber: string;
  relation: RelationType;
}

// 가입신청서 폼 조회 -> 폼 데이터 타입
export interface EnrollmentFormDataType {
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
  member: MemberDtoType;
}

// 가입신청서 등록 & 재등록
export interface EnrollmentInfoType extends MemberDtoInfoType {
  dogId: number;
  schoolFormId: number;
  dogName: string;
  dogGender: DogGenderType | "";
  dogSize: DogSizeType | "";
  breedId: number;
  newBreed: string;
  birthDate: string;
  neutralization: NeutralizationType | "";
  vaccination: VaccinationType | "";
  vaccinationUri: string;
  allergyDisease: string;
  ticketType: TicketType | "";
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  attendanceDays: string[];
  pickDropRequest: PickDropRequestType | "";
  pickDropType: PickDropType | "";
  pickDropMemo: string;
  agreementList: number[];
}

type MemberDtoInfoType = Omit<
  MemberDtoType,
  "memberGender" | "nickName" | "memberProfileUri" | "relation"
> & {
  memberGender: MemberGenderType | "";
};

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
  member: MemberDtoType;
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
  birthDate: string[];
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
