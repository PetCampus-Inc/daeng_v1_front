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
  vaccinationUri: string[];
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

export interface BreedData {
  breedId: number;
  breedName: string;
}

export interface IEnrollmentStatus {
  enrollmentFormId: number;
  memberName: string;
  dogName: string;
  status: string;
}

export interface IEnrollmentDeleteData {
  adminId: number;
  teacherName: string;
  phoneNumber: string;
}
