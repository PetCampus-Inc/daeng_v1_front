import type { IResponse } from "types/Response.type";

export const NeutralizationType = {
  NEUTERED: "NEUTERED",
  NOT_NEUTERED: "NOT_NEUTERED"
} as const;
export type NeutralizationType = (typeof NeutralizationType)[keyof typeof NeutralizationType];

export const VaccinationType = {
  VACCINATED: "VACCINATED",
  NOT_VACCINATED: "NOT_VACCINATED"
} as const;
export type VaccinationType = (typeof VaccinationType)[keyof typeof VaccinationType];

export const DogSizeType = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  BIG: "BIG"
} as const;
export type DogSizeType = (typeof DogSizeType)[keyof typeof DogSizeType];

export const DogGenderType = {
  MALE: "MALE",
  FEMALE: "FEMALE"
} as const;
export type DogGenderType = (typeof DogGenderType)[keyof typeof DogGenderType];

export const PickDropType = {
  ROUND: "ROUND",
  ONE_WAY: "ONE_WAY"
} as const;
export type PickDropType = (typeof PickDropType)[keyof typeof PickDropType];

export const PickDropStateType = {
  RUNNING: "RUNNING",
  NOT_RUNNING: "NOT_RUNNING"
} as const;
export type PickDropStateType = (typeof PickDropStateType)[keyof typeof PickDropStateType];

export const PickDropRequestType = {
  REQUEST: "REQUEST",
  NOT_REQUEST: "NOT_REQUEST"
} as const;
export type PickDropRequestType = (typeof PickDropRequestType)[keyof typeof PickDropRequestType];

export const TicketType = {
  ROUND: "ROUND",
  MONTHLY: "MONTHLY"
} as const;
export type TicketType = (typeof TicketType)[keyof typeof TicketType];

export const MemberGenderType = {
  MALE: "MALE",
  FEMALE: "FEMALE"
} as const;
export type MemberGenderType = (typeof MemberGenderType)[keyof typeof MemberGenderType];

export const RelationType = {
  MOTHER: "MOTHER",
  FATHER: "FATHER",
  SISTER: "SISTER",
  BROTHER: "BROTHER",
  FRIEND: "FRIEND"
} as const;
export type RelationType = (typeof RelationType)[keyof typeof RelationType];

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

// 유치원 재등록 - 가입신청서 폼 조회
export interface EnrollmentDogDataType {
  abandonmentInfo: string;
  accidentInfo: string;
  allergyDisease: string;
  breedId: number;
  breedName: string;
  dogBirthDate: number[];
  dogGender: string;
  dogId: number;
  dogName: string;
  dogSize: string;
  fileUrl: string | null;
  limitsInfo: string;
  member: MemberDtoType;
  monthlyTicketNumber: number[];
  neutralization: string;
  openDays: string[];
  pickDropInfo: string;
  pickDropNotice: string;
  pickDropState: PickDropStateType;
  priceInfo: string;
  requiredItemList: number[];
  roundTicketNumber: number[];
  schoolFormId: number;
  schoolFormName: string;
  ticketInfo: string;
  ticketType: TicketType[];
  vaccination: string;
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

/** 가입신청서 등록 시 Request 타입 */
export interface EnrollmentInfoType extends MemberDtoInfoType {
  dogId: number;
  schoolFormId: number;
  dogName: string;
  dogGender: string;
  dogSize: string;
  breedId: number;
  newBreed: string;
  birthDate: string;
  neutralization: string;
  vaccination: string;
  vaccinationUri: string[];
  allergyDisease: string;
  ticketType: string;
  roundTicketNumber: number;
  monthlyTicketNumber: number;
  attendanceDays: string[];
  pickDropRequest: string;
  pickDropType: string;
  pickDropMemo: string;
  agreementList: number[];
}

interface MemberDtoInfoType {
  memberName: string;
  memberGender: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  address: string;
  addressDetail: string;
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

export interface BreedData {
  breedId: number;
  breedName: string;
}

export interface IEnrollmentStatus {
  enrollmentFormId: number;
  memberName: string;
  dogName: string;
  status: string;
  registeredDate: number[];
}

export interface IEnrollmentDeleteData {
  adminId: number;
  teacherName: string;
  phoneNumber: string;
}

// 유치원 재등록 시 기본적으로 제공되는 정보
export interface IDogBasicEnrollmentInfo {
  allergyDisease: string;
  birthDate: number[];
  breedId: number;
  breedName: string;
  dogGender: string;
  dogId: number;
  dogMemo: string | null;
  dogName: string;
  dogSize: string;
  member: MemberDtoType;
  neutralization: string;
  pickDropMemo: string;
  pickDropRequest: PickDropStateType;
  pickDropType: PickDropType;
  profileUri: string | null;
  vaccination: VaccinationType;
  vaccinationUri: string | null;
}
